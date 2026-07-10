const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    required: true,
    unique: true,
    type: String
  },
  email: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  },
  cart: [{
    productId:{
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      required: true,
      type: Number
    }
  }]
})
const User = mongoose.model("User", userSchema);
module.exports = User