const express = require("express");
const router =express.Router();
const authcontrollers= require("../controllers/auth-controller");

const validate=require('../middelware/valid_midelware');
const signUpSchema = require("../validators/auth_validate"); 




router.route("/").get(authcontrollers.home);

router.route("/register").post(validate(signUpSchema),authcontrollers.register);
router.get("/users/verify/:token", authcontrollers.verifyEmail);
router.route("/login").post(authcontrollers.login);
router.post("/forgot-password", authcontrollers.forgotPassword);
router.post("/reset-password/:token", authcontrollers.resetPassword);


module.exports = router;