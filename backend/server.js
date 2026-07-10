require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User")
const Order = require("./models/Order")


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.get("/",(req,res) => {
  res.send("Shopsphere backend is running")
});

app.get("/profile",authMiddleware, async (req,res)=>{
   try{
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
   }
   catch(error){
      console.log(error)
      return res.status(500).json({ message: "Something went wrong" });
   }  
});

app.get("/products", async(req,res) => {
  try{
     const products = await Product.find()
     res.status(200).json(products);
   }
  catch(error){
     console.log(error)
     return res.status(500).json({ message: "Something went wrong" });
   }  
});

app.post("/products", async(req,res) => {
  try{
      const{ name,price,category,image,description,stock } = req.body;
      if (!name || !price || !category || !description || !image || stock === undefined) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      await Product.create({
       name,
       price,
       category,
       image,
       description,
       stock
      });
      return res.status(201).json({ message: "Product created successfully" });
    }
  catch(error){
      console.log(error)
      return res.status(500).json({ message: "Something went wrong" });
   }
});

app.put("/products/:id", authMiddleware, async(req,res) => {
   try{
      const { id } = req.params;
      const { name, price, category, image, description, stock } = req.body;
      if (!name || !price || !category || !description || !image || stock === undefined) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      const product = await Product.findByIdAndUpdate(
        id,
        { name, price, category, image, description, stock },
        { new: true, runValidators: true }
      );
      if(!product){
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ message: "Product updated successfully", product });
   }
   catch(error){
      console.log(error)
      return res.status(500).json({message: "Something went wrong"})
   }
});

app.post("/register", async(req,res) => {
  try{
      const{username, email, password} = req.body
      if(!username || !email || !password){
       return res.status(400).json({ message: "Please fill all fields" });
      }
      const existingUsername = await User.findOne({username})
      if(existingUsername){
        return res.status(409).json({ message: "Username already exists"});
      }
      const existingEmail = await User.findOne({email})
      if(existingEmail){
        return res.status(409).json({ message: "Email already exists"});
      }
      const hashedPassword = await bcrypt.hash(password,10)
      await User.create({
        username,
        email,
        password: hashedPassword
      })
      return res.status(201).json({ message: "User created successfully" });
    }    
    catch(error){
      console.log(error)
      return res.status(500).json({ message: "Something went wrong" });
    }
});

app.post("/login", async(req,res) => {
   try{
      const{email,password} = req.body;
      if(!email || !password){
        return res.status(400).json({message: "Please fill all fields"})
      }
      const user = await User.findOne({email})
      if(!user){
        return res.status(404).json({message: "User not found"})
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if(!isPasswordCorrect){
        return res.status(401).json({ message: "Incorrect password" });
      }
      const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
      return res.status(200).json({ token });
   }
   catch(error){
     console.log(error)
     return res.status(500).json({message: "Something went wrong"})
   }
});

app.get("/cart", authMiddleware, async(req,res) => {
   try{
      const user = await User.findById(req.user.id).populate("cart.productId");
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ cart: user.cart });
   }
   catch(error){
     console.log(error)
     return res.status(500).json({message: "Something went wrong"})
   }
});

app.post("/cart", authMiddleware, async(req,res) => {
   try{
      const { productId, quantity = 1 } = req.body;
      if(!productId){
        return res.status(400).json({ message: "Product id is required" });
      }
      if(quantity < 1){
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }
      const product = await Product.findById(productId);
      if(!product){
        return res.status(404).json({ message: "Product not found" });
      }
      const user = await User.findById(req.user.id);
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }
      const cartItem = user.cart.find((item) => item.productId.toString() === productId);
      if(cartItem){
        cartItem.quantity += quantity;
      } 
      else{
        user.cart.push({ productId, quantity });
        }
      await user.save();
      return res.status(200).json({ message: "Cart updated successfully", cart: user.cart });
   }
   catch(error){
     console.log(error)
    return res.status(500).json({message: "Something went wrong"})
   }
});

app.delete("/cart/:productId", authMiddleware, async(req,res) => {
   try{
      const { productId } = req.params;
      const user = await User.findById(req.user.id);
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }
      const cartItem = user.cart.find((item) => item.productId.toString() === productId);
      if(!cartItem){
        return res.status(404).json({ message: "Product not found in cart" });
      }
      user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
      await user.save();
      return res.status(200).json({ message: "Product removed from cart", cart: user.cart });
   }
   catch(error){
      console.log(error)
      return res.status(500).json({message: "Something went wrong"})
   }
});

app.post("/orders", authMiddleware, async(req,res) => {
   try{
      const user = await User.findById(req.user.id).populate("cart.productId");
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }
      if (user.cart.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      const products = user.cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        priceAtPurchase: item.productId.price
      }));
      const totalPrice = products.reduce((total, item) => {
        return total + item.quantity * item.priceAtPurchase;
      }, 0);
      const order = await Order.create({
        userId: user._id,
        products,
        totalPrice,
        status: "Completed"
      });
      user.cart = [];
      await user.save();
      return res.status(201).json({ message: "Order placed successfully", order });
   }
   catch(error){
      console.log(error)
      return res.status(500).json({message: "Something went wrong"})
   }
});

app.get("/orders", authMiddleware, async(req,res) => {
   try{
      const orders = await Order.find({ userId: req.user.id })
        .populate("products.productId")
        .sort({ createdAt: -1 });
      return res.status(200).json({ orders });
   }
   catch(error){
      console.log(error)
      return res.status(500).json({message: "Something went wrong"})
   }
});

mongoose.connect(process.env.MONGO_URI) 
.then(() => { 
  console.log("MongoDB connected"); 
  app.listen(PORT, () => { 
   console.log(`Server is running on port ${PORT}`);
  });
}) 
.catch((error) => {
  console.log(error);
});
