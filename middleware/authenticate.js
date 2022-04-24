const userData = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const authenticate = async function(req, res ,next){
    try{
        let token = req.cookies.noteToken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await userData.findOne({_id: verifyToken._id, "tokens.token": token});
        if(!rootUser){
            throw new Error("User not found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    }catch(err){
        res.status(401).json({error: "Unauthorized: Token not provided"});
        console.log(err);
    }
}

module.exports = authenticate;