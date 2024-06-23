const { error } = require("console");
const User = require("../models/users");
const jswebtoken= require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    //    res.status(200).json({message:"Creating USer"});
    console.log(req.body);
    const { name, mobilenumber, emailId, password } = req.body;
    let createuser = await User.create({
      name,
      mobilenumber,
      emailId,
      password,
    });
    let payload={user:{id:createuser._id}};
    console.log("payload:-",payload)
    jswebtoken.sign(payload,process.env.TOKEN_SECRET_KEY,{expiresIn:"1h"},(err,token)=>{
        if(err)
            throw err
        res.status(200).json({token:token,createuser});
    })
    // res.status(200).json({ message:createuser });
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const userSignIn=async(req,res)=>{
    try{
    
    const {emailId,password}=req.body;
    console.log(emailId,password);
    let checkEmail= await User.findOne({emailId:emailId});
    console.log(checkEmail);
    if(!checkEmail || !checkEmail.comparePassword(password)){
        res.status(200).json({message:"Incorrect Credentials"});
    }else{
      res.status(200).json({message:"user Sing In",emailId,checkEmail});
    }
    }catch(e){
        return{
            error:true,
            details:e
        }
    }
}
module.exports = { createUser ,userSignIn};
