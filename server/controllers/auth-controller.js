const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");

const home = async (req,res) => {
    try {
        res.status(200).send('Welcome to pet shop by router');
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        const newUser = new User({ username, email, phone, password });
        const userCreated = await newUser.save(); 
        res.status(201).json({ msg: "User registered successfully", token: await userCreated.generateToken() , userID:userCreated._id.toString(),});
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Registration failed", error });
    }
};

const login = async (req,res) => {
    try {
        const { email , password } = req.body;
        const userExist = await User.findOne({ email });
        console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ msg: "Invali credential" });
        }
        //const user = await bcryptjs.compare(password ,userExist.password);
        const user = await userExist.comparePassword(password);
        if(user){
            res.status(200).json({ msg: "login successfully", token: await userExist.generateToken() , userID:userExist._id.toString(),});
        }
        else{
            res.status(401).json({msg:"Invalid email or password"});
        }
        
    } catch (error) {
        res.status(400).json({ msg: "login failed", error });
    }
}



module.exports = { home, register, login};