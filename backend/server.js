require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.get("/",(req,res) => {
  res.send("Shopsphere backend is running")
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
