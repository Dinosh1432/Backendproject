const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const bodyparser=require("body-parser")
const venderRoutes=require("./routes/vendorRoutes")
const Firmroutes=require("./routes/Firmroutes")
const productRoutes=require("./routes/productRoutes")
const app=express()
const path=require("path")

const PORT=4000;
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("monoDB successfully conected ")})
.catch((err)=>{console.log(err)})

app.use(bodyparser.json())

app.use('/vendor',venderRoutes)
app.use('/firm',Firmroutes)
app.use("/product",productRoutes)
app.use("/uploads",express.static("uploads"));

app.listen(PORT,()=>{
    console.log(`server started in ${PORT}`)
})

app.use("/home",(req,res)=>{
    res.send("<h1>welcome to SUBY</h1>")
})