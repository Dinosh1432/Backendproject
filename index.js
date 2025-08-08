const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const vendorRoutes = require("./routes/vendorRoutes");
const firmRoutes = require("./routes/Firmroutes");
const productRoutes = require("./routes/productRoutes");
const path = require("path");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS Middleware - must be before routes
app.use(cors({
  origin: [
    "https://react-suby-backend-dashboard-j8d4whhvr-dinoshs-projects.vercel.app", // Your frontend Vercel URL
    "http://localhost:5173" // Local development
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "token"], // ✅ Added token here
  credentials: true
}));

// ✅ Middleware
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB successfully connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

// ✅ Base Route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SUBY API</h1>");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
