const express = require("express");
const router =express.Router();
const authcontrollers= require("../controllers/auth-controller");

const validate=require('../middelware/valid_midelware');
const signUpSchema = require("../validators/auth_validate"); 



app.get("/", (req, res) => {
  res.send("Welcome to the ToLet Globe API!");
});
router.route("/").get(authcontrollers.home);

router.route("/register").post(validate(signUpSchema),authcontrollers.register);
router.route("/login").post(authcontrollers.login);



module.exports = router;