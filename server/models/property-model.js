const mongoose = require("mongoose");


const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone:{
    type:String,
    required: true,
  },
  propertyTitle:{
    type:String,
    required: true,
  },
 
  description:{
    type:String,
    required: true,
  },
  bhk:{
    type:Number,
    required: true,
  },
  price:{
    type:Number,
    required: true,
  },
  area:{
    type:Number,
    required: true,
  },
  furnishing:{
    type:String,
    default:"",
  },
  preferance:{
    type:String,
    default:"",
  },
  gender:{
    type:String,
    default:"",
  },
  floor:{
    type:Number,
    required: true,
  },
  washroom:{
    type:String,
    default:"",
  },
  type:{
    type:String,
    required: true,
  },
  address:{
    type:String,
    required: true,
  },
  city:{
    type:String,
    required: true,
  },
  pincode:{
    type:String,
    default:"",
  },
  state: {
    type: String,
    default:"",
  },
  landmark: {
    type: String,
    default:"",
  },
  nearby: {
    type: String,
    default:"",
  },
  latitude: {
    type: String,
    default:"",
  },
  longitude: {
    type: String,
    default:"",
  },
  images: [String],
  
  date:{
    type:Date,
    default:Date.now(),
  },
  viwes:{
    type:Number,
    default:0
  },


});

propertySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRound = 10;
    this.password = await bcryptjs.hash(this.password, saltRound);
    next();
  } catch (error) {
    return next(error);
  }
});


const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
