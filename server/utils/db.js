const mongoose = require("mongoose");

//const URI = "mongodb://127.0.0.1:27017/mern_admin";
//mongoose.connect(URI);

const URI= process.env.MONGODB_URI;

const connectdb= async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection successfull database")
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
};

module.exports = connectdb;