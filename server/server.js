require("dotenv").config();
const express = require("express");
const app= express();
const cors =require('cors');
const authRouter =require("./router/auth-router");
const contactRouter =require("./router/contact-router");
const connectdb = require("./utils/db");
const errormiddleware = require("./middelware/errorhandler_middelware");
const blogRouter = require("./router/blog");
const propertyRouter =require("./router/property-router");
//const CLIENT_URL = process.env.CLIENT_URL;


var corsOptions = {
  origin: [
    "http://localhost:5173", 
    "https://internship-project-tolet-globe.vercel.app",
    "https://internship-project-tolet-globe-cfc644oyx.vercel.app"
  ],
  methods:"GET, POST , PUT , DELETE , HEAD ",
  credential:true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send("Welcome to the ToLet Globe API!");
});
app.use("/api/auth" , authRouter);
app.use("/api/form" , contactRouter);
app.use("/api/auth" , blogRouter);
app.use("/api/property" , propertyRouter);


app.use(errormiddleware);

const PORT = process.env.PORT || 8000;

connectdb().then(()=>{
    app.listen(PORT ,()=>{
        console.log("server running");
        
    })
});

