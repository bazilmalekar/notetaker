const express = require("express");
const notes = require("../client/src/data/notes");
const router = express.Router();
const userData = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

router.get("/api/notes", (req, res) => {
    res.send(notes);    
});

// router.get("/api/notes/:id", (req, res) => {
//     const note = notes.find((n) => n._id === req.params.id);
//     res.send(note);
// });

router.post("/register", async(req, res) => {
    try{
        const {name, email, imageUrl, password, cpassword} = req.body;
        if(!name || !email || !password || !cpassword){
            throw new Error("Please fill all the fields");
        }

        const userExists = await userData.findOne({email:email});
        if(userExists){
            res.status(422).json({message: "Email already exists"});
        }else if(password !== cpassword){
            res.status(422).json({message: "Passwords donot match"});
        }else{
            const user = new userData({
                name, email, imageUrl, password, cpassword
            });
            await user.save();
            res.status(201).json(user);
        }
    }catch(err){
        console.log(err);
    }
});

router.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error("Please fill all the fields");
        }
        const userLogin = await userData.findOne({email:email});        
        if(userLogin){
            const passwordMatch = await bcrypt.compare(password, userLogin.password);  
            //Json Web Token
            const token = await userLogin.generateAuthToken();
            res.cookie("noteToken", token, {
                expires: new Date(Date.now + 25892000000),
                httpOnly: true
            });          
            if(passwordMatch){
                res.status(201).json({message: "User logged in successfully"});
            }else{
                res.status(422).json({error: "Invalid Credentials"});
            }
        }else{
            res.status(422).json({error: "Invalid Credentials"});
        }
    }catch(err){
        console.log(err);
    }
});

router.get("/getData", authenticate, (req, res) => {
    console.log("Getting user data");
    res.send(req.rootUser);
});

router.post("/postNote", authenticate, async(req, res) => {
    try{
        const note = req.body.note;
        if(!note){
            throw new Error("Please add note");
        }

        const userNote = await userData.findOne({_id: req.userID});
        if(userNote){
            const userMessage  = await userNote.addNote(note);
            await userNote.save();
            res.status(201).json({message: "Note added"});
        }
    }catch(err){
        console.log(err);
    }
});

router.delete("/notes/delete/:delete_id", authenticate, async(req, res) => {
    try{
        const deleteUser = await userData.findOneAndUpdate({_id: req.rootUser}, {"$pull": {"notes": {"_id" : req.params.delete_id}}});
        res.status(200).json({message: "Note deleted"});
        console.log(deleteUser);
    }catch(err){
        console.log(err);
    }
});

router.get("/logout", async(req, res) => {
    console.log("User logged out");
    res.clearCookie("noteToken", {path: "/"});
    res.status(200).json({message: "User logged out"});
});

router.patch("/myProfile/edit", authenticate, async(req, res) => {
    try{
        const {name, email} = req.body;
        if(!name || !email){
            throw new Error("No data to edit");
        }

        const editUser = await userData.findOneAndUpdate({_id: req.userID}, req.body, {
            new: true
        });
        if(!editUser){
            return res.status(404).send();
        }else{
            res.send(editUser);
        }

    }catch(err){
        console.log(err);
    }
});

router.get("/notes/edit/get/:edit_id", authenticate, async(req, res) => {
    try{
        const modalData = await userData.findOne({_id: req.userID}, {notes: {$elemMatch: {_id: req.params.edit_id}}});
        res.status(200).send(modalData);
        console.log(modalData);
        // console.log(typeof(req.params.edit_id)); //string
        // console.log(typeof(req.userID)); //object
        // const data = await userData.findOne({_id: req.userID});        
        // if(data && data.notes.length > 0){
        //     for(let i=0; i<data.notes.length; i++){
        //         if(data.notes[i]._id && data.notes[i]._id.toString() == req.params.edit_id){
        //             console.log(data.notes[i].note); 
        //         }   
        //     }
        // }else{
        //     console.log("No note found");
        // }
    }catch(err){    
        console.log(err);
    }
});

router.patch("/notes/edit/editnote/:edit_id", authenticate, async(req, res) => {
    try{
        const note = req.body.individualNote;
        const editModalData = await userData.updateOne(
            {
                _id: req.userID
            },
            {
                "$set": {
                    "notes.$[o].note": note
                }
            },
            {
                "arrayFilters": [
                    {
                        "o._id": req.params.edit_id
                    }
                ]
            }
        );
        res.status(201).send(editModalData);
        console.log(editModalData);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;
