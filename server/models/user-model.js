const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next(); 
  }

  try {
    const saltRound = 10;
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
    next();
  } catch (error) {
    return next(error); 
  }
});


userSchema.methods.comparePassword = async function(password){
  return bcrypt.compare(password ,this.password);
};


//jwt
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({
      userID:this._id.toString(),
      email:this.email,
      isAdmin:this.isAdmin,
    },
    process.env.JWT_KEY,{
      expiresIn:"30d",
    }
  );
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
