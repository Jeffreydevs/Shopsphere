require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/Product");

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
      console.log(product)
      return res.status(201).json({ message: "Product created successfully" });
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
