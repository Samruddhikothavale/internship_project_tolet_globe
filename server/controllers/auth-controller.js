const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");



const home = async (req, res) => {
    try {
        res.status(200).send('Welcome to to let globe by router');
    } catch (error) {
        console.log(error)
    }
}


const register = async (req, res) => {
  try {
    const { username, email, phone, password, role, userType } = req.body;
    console.log(req.body);

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const token = jwt.sign({ username, email, phone, password, role, userType }, process.env.JWT_KEY, { expiresIn: "10m" });

    const newUser = new User({
      username,
      email,
      phone,
      password,
      role,
      userType: role === "user" ? userType : "",
      isAdmin: role === "admin", 
      isVerified: false,
    });

    await newUser.save();

    try {
      await sendEmail(email, token);
      return res.status(200).json({ message: "Verification email sent!" });
    } catch (err) {
      console.error("Email send failed:", err.message);
      return res.status(201).json({
        message: "Failed to send verification email. Please try again.",
      });
    }

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ msg: "Registration failed" });
  }
};




const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).send('token is missing');
        }

        const user = await User.findOne({
            verificationToken: token,
            isVerified: false,
        });

        if (!user) {
            console.log("Invalid or expired token");
            return res
                .status(200)
                .json({ message: "Invalid or expired verification token." });
        }
        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: "Account verified successfully!" });

        res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);
    } catch (error) {
        console.error("Email verification error:", error);
        res.status(400).send("Invalid or expired verification link.");
    }



};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) return res.status(400).json({ msg: "Invalid credentials" });
        if (!userExist.isVerified) return res.status(403).json({ msg: "Please verify your email first." });

        const isMatch = await userExist.comparePassword(password);
        if (!isMatch) return res.status(401).json({ msg: "Invalid email or password" });

        res.status(200).json({
            msg: "Login successful",
            token: await userExist.generateToken(),
            userID: userExist._id.toString(),
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Login failed" });
    }
};




module.exports = { home, register, verifyEmail, login };