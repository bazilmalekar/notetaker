const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String, 
        unique: true,
        required: true
    }, 
    imageUrl: {
        type: String
    },
    password: {
        type: String,
        required: true
    }, 
    cpassword: {
        type: String, 
        required: true
    }, 
    isAdmin: {
        type: Boolean, 
        default: false
    }, 
    pic: {
        type: String, 
    }, 
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    notes: [
        {
            note: {
                type: String,
                required: true
            }
        }
    ],  
}, {
    timestamps: true
});

userSchema.pre("save", async function(req, res, next){
    try{
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password, 12);
            this.cpassword = await bcrypt.hash(this.cpassword, 12);
        }
        next();
    }catch(err){
        console.log(err);
    }
});

userSchema.methods.generateAuthToken = async function(req, res, next){
    try{
        let token = await jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

userSchema.methods.addNote = async function(note){
    try{
        this.notes = this.notes.concat({note});
        await this.save();
        return this.notes;
    }catch(err){
        console.log(err);
    }
}

const userData = mongoose.model("USERDATA", userSchema);

module.exports = userData;