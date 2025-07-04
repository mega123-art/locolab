// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

const router = express.Router();

// POST /signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, role, username, contactEmail } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "Email already in use" });

    if (role === "creator") {
      const existingUsername = await User.findOne({ username });
      if (existingUsername)
        return res.status(409).json({ error: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      username: role === "creator" ? username : undefined,
      contactEmail: role === "creator" ? contactEmail : undefined,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /create-admin (temporary endpoint for creating admin)
router.post("/create-admin", async (req, res) => {
  try {
    const { email, password, adminSecret } = req.body;

    // Simple secret check - in production, use environment variable
    if (adminSecret !== "admin123") {
      return res.status(403).json({ error: "Invalid admin secret" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin user created successfully" });
  } catch (err) {
    console.error("Create admin error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res
      .status(200)
      .json({
        token,
        user: { id: user._id, role: user.role, username: user.username },
      });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    // Replace this with actual email sending logic
    console.log(`Reset link: http://localhost:3000/reset-password/${token}`);

    res.status(200).json({ message: "Reset link sent (check server log)" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});
  
router.get("/check-username", async (req, res) => {
  try {
    const username = req.query.value;
    if (!username)
      return res.status(400).json({ error: "Username is required" });

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(200).json({ available: false });
    } else {
      return res.status(200).json({ available: true });
    }
  } catch (err) {
    console.error("Username check error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;