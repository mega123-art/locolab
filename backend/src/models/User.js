// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["creator", "brand", "admin"], required: true },
    username: { type: String, unique: true, sparse: true },
    contactEmail: { type: String },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
