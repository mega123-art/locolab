// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CreatorProfile = require("../models/CreatorProfile");
const {authenticate,authorizeRoles}=require("../middleware/auth")

// PATCH /api/admin/creators/:creatorId
router.patch(
  "/creators/:creatorId",
  authenticate,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const { creatorId } = req.params;
      const updateData = req.body;

      const user = await User.findById(creatorId);
      if (!user || user.role !== "creator") {
        return res.status(404).json({ error: "Creator not found" });
      }

      let profile = await CreatorProfile.findOne({ user: creatorId });

      if (!profile) {
        profile = new CreatorProfile({ user: creatorId });
      }

      Object.assign(profile, updateData);
      await profile.save();

      res.status(200).json({ message: "Creator profile updated", profile });
    } catch (err) {
      console.error("Admin update error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.get(
  "/creators/pending",
  authenticate,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      // Get all creators
      const creators = await User.find({ role: "creator" });

      // Get creators who already have a profile
      const profiles = await CreatorProfile.find({}, "user");
      const profiledIds = profiles.map((p) => p.user.toString());

      const pending = creators.filter(
        (c) => !profiledIds.includes(c._id.toString())
      );

      res.status(200).json({ pendingCreators: pending });
    } catch (err) {
      console.error("Error fetching pending creators:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);
  

router.get(
  "/creators/fulfilled",
  authenticate,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const profiles = await CreatorProfile.find().populate(
        "user",
        "email username contactEmail"
      );

      res.status(200).json({ fulfilledCreators: profiles });
    } catch (err) {
      console.error("Error fetching fulfilled creators:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
