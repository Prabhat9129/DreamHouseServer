const mongoose = require("mongoose");
const propertySchma = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: [true, "User id is required"],
  },
  title: { type: String, require: [true, "Property Title is required!"] },
  description: {
    type: String,
    require: [true, "Descrption about property is required!"],
  },
  status: { type: String, require: [true, "Status is required!"] },
  type: {
    type: String,
    require: [true, "Please provide property Type!"],
  },
  rooms:{
    type:Number,
    required:[true,"Please provide no of rooms!"],
  },
  price: {
    type: Number,
    require: [true, "what is the price of your property!"],
  },
  area: {
    type: Number,
    require: [true, "what is the size of your property!"],
  },
  address: {
    type: String,
    require: [true, "what is the local area address of your property!"],
  },
  country:{
    type:String,
    required:[true,"country is required"],
  },
  state:{
    type:String,
    required:[true,"state is required"],
  },
  city:{
    type:String,
    required:[true,"City is required"],
  },
  latitude:{
    type:Number,
    required:[true,"Latitude is required"],
  },
  longitude:{
    type:Number,
    required:[true,"Logitude is required"],
  },
  image: { 
    type: String,
    require: [true, "what is the local area address of your property!"]
  },
  age:{type:Number},
  bed:{type:Number},
  bath:{type:Number},
  allowance: { type: Boolean,default:false },
});

const property = mongoose.model("Property", propertySchma);
module.exports = property;
