const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [{
    productId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      required: true,
      type: Number,
      min: 1
    },
    priceAtPurchase: {
      required: true,
      type: Number,
      min: 0
    }
  }],
  totalPrice: {
    required: true,
    type: Number,
    min: 0
  },
  status: {
    required: true,
    type: String,
    default: "Pending"
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now
  }
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order