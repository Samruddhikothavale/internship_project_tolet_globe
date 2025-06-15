const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author:{
    type:String,
    required: true,
  },
  role:{
    type:String
  },
  image: {
    type: String,
  },
  
  date:{
    type:Date,
    default:Date.now(),
  },
  likes:{
    type:Number,
    default:0
  },
  viwes:{
    type:Number,
    default:0
  },


});

blogSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRound = 10;
    this.password = await bcryptjs.hash(this.password, saltRound);
    next();
  } catch (error) {
    return next(error);
  }
});


const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
