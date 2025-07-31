const express=require("express");
const productController=require("../controllers/productController")
const router=express.Router();
const path=require("path")

router.post("/add-product/:firmId",productController.addProduct);
router.get("/getprodutsByFirm/:firmId",productController.getProductByFirm);

router.get("/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    res.setHeader("Content-Type", "image/jpeg");
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
})

router.delete("/:productId",productController.deleteProductById)

module.exports=router

