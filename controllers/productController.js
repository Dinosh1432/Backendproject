const Firm=require("../models/Firm");
const Product = require("../models/Product");
const Vendor=require("../models/Vendor");
const multer=require("multer");
const path=require("path")

const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
const upload=multer({storage:storage})

const addProduct=async(req,res)=>{
    try {
        const {productName,price,category,bestseller,description}=req.body
        const image=req.file?req.file.filename:undefined
        const firmId=req.params.firmId
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"no firm found "});
        }
        const product=new Product({
                productName,
                price,
                category,
                image,
                bestseller,
                description,
                firm:firm._id
            });
        const savedProduct=await product.save()
        firm.products.push(savedProduct);
        await firm.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }
}

const getProductByFirm=async(req,res)=>{
    const firmId=req.params.firmId;
    const firm=await Firm.findById(firmId);
    if(!firm){
       return  res.status(404).json({error:"firm not found"});
    }
    const product=await Product.find({firm:firmId});
    if(!product){
        return res.status(404).json({error:"product not found"})
    }
    res.status(200).json(product)
}

const deleteProductById=async(req,res)=>{
    try{
        const productId=req.params.productId;
        const deletedProduct=await Product.findByIdAndDelete(productId)
        if(!deletedProduct){
            return res.status(404).json({error:"product not found "})
        }
    res.status(201).json(deletedProduct)
    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }
}
module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};
