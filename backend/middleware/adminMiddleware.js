const User = require("../models/User");

const adminMiddleware = async(req,res,next) => {
    try{
      if(!req.user || !req.user.id){
        return res.status(401).json({message: "Access denied"});
      }
      const user = await User.findById(req.user.id);
      if(!user){
        return res.status(404).json({message: "User not found"});
      }
      if(user.role !== "admin"){
        return res.status(403).json({message: "Admin access required"});
      }
      next();
    }
    catch(error){
      console.log(error)
      return res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = adminMiddleware
