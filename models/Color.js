const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Color name is required"],
    minLength: [3, "Color name must be at least 3 characters"],
    maxLength: [20, "Color name must not exceed 20 characters"],
  },
  code: {
    type: String,
    required: [true, "Color code is required"],
    minLength: [3, "Color code must be at least 3 characters"],
    maxLength: [10, "Color code must not exceed 10 characters"],
  },
},{ timestamps: true }
);

module.exports = mongoose.model("Color", colorSchema);
