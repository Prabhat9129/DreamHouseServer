const mongoose = require("mongoose");
const property_typeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: [true, "Property Type Name is require"],
  },
});

const property_typeModel = mongoose.model("PropertyType", property_typeSchema);
module.exports = property_typeModel;
