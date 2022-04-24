const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.DB, 
            // {
            //     userNewUrlParser: true, 
            //     useUnifiedTopology: true, 
            //     useFindAndModify: false
            // }
        );
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log(`Error:${err.message}`);
    }
}

module.exports = connectDB;