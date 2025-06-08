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

    const verifyToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      username,
      email,
      phone,
      password,
      role,
      userType: role === "user" ? userType : "",
      isAdmin: role === "admin",
      isVerified: false,
      verifyEmailToken: verifyToken,
      verifyEmailTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await newUser.save();
    try {
          const verificationUrl = `${process.env.CLIENT_URL}/verify/${token}`;

      await sendEmail(email, verifyToken, "Verify your account", "Account Registration",verificationUrl);
      return res.status(200).json({ message: "Verification email sent!" });
    } catch (err) {
      console.error("Email send failed:", err.message);
      return res.status(500).json({
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

    if (!token) return res.status(400).send("Token is missing");

    const user = await User.findOne({
      verifyEmailToken: token,
      verifyEmailTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token." });
    }

    user.isVerified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailTokenExpiry = undefined;
    await user.save();

    const authToken = await user.generateToken();

    res.status(200).json({
      message: "Email verified successfully!",
      token: authToken,
      userID: user._id.toString(),
    });

  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Verification failed." });
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 1000 * 60 * 15; // 15 minutes
    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail(
      email,
      token,
      "Password Reset",
      "Click the link to reset your password:",
      resetURL
    );

    res.status(200).json({ msg: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot Password:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    console.log("Received reset token:", token);
    
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Token is invalid or has expired" });
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ msg: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password:", error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};




module.exports = { home, register, verifyEmail, login, forgotPassword, resetPassword };