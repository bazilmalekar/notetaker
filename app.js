const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/conn");
const {notFound, errorHandler} = require("./ErrorHandler");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

dotenv.config({path: "./config.env"});
PORT = process.env.PORT || 5000;

// app.use(notFound);
// app.use(errorHandler);

//db connection
connectDB();

//model
const userData = require("./model/userSchema");

app.use(express.json());

app.use(require("./router/auth"));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is active on port ${PORT}`);
});