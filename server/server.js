require("dotenv").config();
const express = require("express");
const app= express();
const cors =require('cors');
const authRouter =require("./router/auth-router");
const contactRouter =require("./router/contact-router");
const connectdb = require("./utils/db");
const errormiddleware = require("./middelware/errorhandler_middelware");
const path = require("path");


var corsOptions = {
  origin: "http://localhost:5173",
  methods:"GET, POST , PUT , DELETE , HEAD ",
  credential:true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/auth" , authRouter);
app.use("/api/form" , contactRouter);

app.use(express.static(path.join(__dirname, "client/build")));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// app.get("/",(req,res)=>{
//     res.status(200).send('Welcome to pet shop');
// });
app.use(errormiddleware);

const PORT = process.env.PORT || 8000;

connectdb().then(()=>{
    app.listen(PORT ,()=>{
        console.log("server running");
        
    })
});

