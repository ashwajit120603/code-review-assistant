const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// MongoDB connection (optional but recommended)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

app.use("/api/review", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



