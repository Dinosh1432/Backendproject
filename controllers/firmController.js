const Firm=require("../models/Firm")
const Vendor=require("../models/Vendor")
const multer=require("multer")
const path=require("path")
const upload = require("../cloudinary/upload");
const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.path : undefined; // Cloudinary URL

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "vendor not found" });
    }

    if (vendor.firm.length > 0) {
      return res.status(400).json({ message: "please add limited firms" });
    }

    const firms = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedFirm = await firms.save();
    vendor.firm.push(savedFirm);
    await vendor.save();

    return res.status(200).json({
      message: "Firm added successfully",
      firmId: savedFirm._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};

const deleteFirmById=async(req,res)=>{
    try{
            const firmId=req.params.FirmId;
            const deletedfirm=await Firm.findByIdAndDelete(firmId)
            if(!deletedfirm){
                return res.status(404).json({error:"product not found "})
            }
            res.status(201).json(deletedfirm)
        }catch(error){
            console.error(error);
            res.status(500).json({error:"internal server error"})
        }
}
module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}