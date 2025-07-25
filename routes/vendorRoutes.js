const vendorController=require("../controllers/venderController")
const express=require("express")
const router=express.Router();

router.post('/register',vendorController.venderRegister)
router.post('/login',vendorController.vendorLogin)
router.get("/all-vendors",vendorController.getAllVendors)
router.get("/single-vendor/:id",vendorController.getVendorById)
module.exports=router;

