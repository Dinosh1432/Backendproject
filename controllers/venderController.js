const Vendor=require("../models/Vendor");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const dotenv=require("dotenv")
dotenv.config()

const venderRegister=async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const vendoremail=await Vendor.findOne({email});
        if(vendoremail){
            return res.status(400).json("email already taken")       
        }
            const hashedpassword=await bcrypt.hash(password,10);
            const newVendor=new Vendor({
                username,
                email,
                password:hashedpassword
            });
            await newVendor.save()
            res.status(201).json({message:"Vendor registered sucessfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({err:"internel server eroor"})
    }
}

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body;
try{
    const vendor=await Vendor.findOne({email});
    if(!vendor || !(await bcrypt.compare(password,vendor.password))){
        return res.status(401).json({error:"invalid credentials"})
    }
    const token=jwt.sign({vendorId:vendor._id,vendor},process.env.secretKey,{expiresIn:"1h"})

    return res.status(200).json({sucess:"login sucessfully",token})

}catch(error){
    console.log(error)
}
}

const getAllVendors=async(req,res)=>{
    try{
    const vendors=await Vendor.find().populate('firm')
    res.json({vendors})
    }
    catch(err){
        res.status(404).json({error:"vendor not found"})
    }
}

const getVendorById=async(req,res)=>{
    const vendorId=req.params.id;
    try{
        const vendor=await Vendor.findById(vendorId)
        if(!vendor){
            res.status(401).json({error:"vendor not found"})
        }
        res.json({vendor})
    }
    catch(error){
        res.status(500).json({error:"internel servel error"})
    }
}

module.exports={venderRegister,vendorLogin,getAllVendors,getVendorById}