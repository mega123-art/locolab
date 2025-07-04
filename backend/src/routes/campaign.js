// backend/routes/campaign.js
const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");
const User = require("../models/User");
const { authenticate, authorizeRoles } = require("../middleware/auth");
// POST /api/campaigns
router.post("/", authenticate, authorizeRoles("brand"), async (req, res) => {
  try {
    const {
      brandId,
      name,
      niche,
      city,
      description,
      startDate,
      endDate,
      rewardType,
      budgetRange,
      images,
    } = req.body;

    const brand = await User.findById(brandId);
    if (!brand || brand.role !== "brand") {
      return res.status(400).json({ error: "Invalid brand ID" });
    }

    const newCampaign = new Campaign({
      brand: brandId,
      name,
      niche,
      city,
      description,
      startDate,
      endDate,
      rewardType,
      budgetRange: rewardType === "money" ? budgetRange : undefined,
      images,
    });

    await newCampaign.save();
    res
      .status(201)
      .json({ message: "Campaign created", campaign: newCampaign });
  } catch (err) {
    console.error("Create campaign error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /api/campaigns/:campaignId/star
router.patch(
  "/:campaignId/star",
  authenticate,
  authorizeRoles("brand"),
  async (req, res) => {
    try {
      const { campaignId } = req.params;
      const { creatorId } = req.body;

      const campaign = await Campaign.findById(campaignId);
      if (!campaign)
        return res.status(404).json({ error: "Campaign not found" });

      if (!campaign.starredCreators.includes(creatorId)) {
        campaign.starredCreators.push(creatorId);
        await campaign.save();
      }

      res.status(200).json({ message: "Creator starred", campaign });
    } catch (err) {
      console.error("Star creator error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// GET /api/campaigns/:campaignId/starred
router.get(
  "/:campaignId/starred",
  authenticate,
  authorizeRoles("brand"),
  async (req, res) => {
    try {
      const { campaignId } = req.params;

      const campaign = await Campaign.findById(campaignId).populate(
        "starredCreators",
        "username contactEmail"
      );
      if (!campaign)
        return res.status(404).json({ error: "Campaign not found" });

      res.status(200).json({ starredCreators: campaign.starredCreators });
    } catch (err) {
      console.error("Get starred creators error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
