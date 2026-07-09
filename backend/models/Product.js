const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  category: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  image: {
    required: true,
    type: String
  },
  stock: {
    required: true,
    type: Number
  }    
})
const Product = mongoose.model("Product", productSchema);
module.exports = Product;