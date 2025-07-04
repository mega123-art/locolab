// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/auth");
const creatorRoutes = require("./routes/creator");
const campaignRoutes = require("./routes/campaign");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/creators", creatorRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running...");
    });
  })
  .catch((err) => console.error(err));
