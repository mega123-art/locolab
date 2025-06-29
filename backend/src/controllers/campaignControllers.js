import { Campaign } from "../models/campaignModel.js";
import { User } from "../models/userModel.js";
import { Notification } from "../models/notificationModel.js";
export const createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      location,
      maxDistance,
      budgetRange,
      scheduledDate,
    } = req.body;
    const userId = req.user.id;

    // Check if user is a Brand
    const user = await User.findById(userId);
    if (user.role !== "Brand") {
      return res
        .status(403)
        .json({ message: "Only brands can create campaigns" });
    }

    // Restrict to one campaign per week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentCampaign = await Campaign.findOne({
      postedBy: userId,
      createdAt: { $gte: oneWeekAgo },
    });

    if (recentCampaign) {
      return res
        .status(400)
        .json({ message: "You can only post one campaign per week" });
    }

    // Create and save campaign
    const newCampaign = new Campaign({
      title,
      description,
      type,
      location,
      maxDistance,
      budgetRange,
      scheduledDate,
      postedBy: userId,
    });

    await newCampaign.save();
    const creators = await User.find({
      role: "Creator",
      location: location,
    });
    const notifications = creators.map((creator) => ({
      recipient: creator._id,
      campaign: newCampaign._id,
      message: `A new campaign "${title}" is available near you.`,
    }));
    await Notification.insertMany(notifications);
    res.status(201).json({
      message: "Campaign created successfully",
      campaign: newCampaign,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const listCampaigns = async (req, res) => {
  try {
    const userId = req.user.id;

    const campaigns = await Campaign.find({ postedBy: userId }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ message: "Campaigns fetched successfully", campaigns });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const userId = req.user.id;
    const { campaignId } = req.params;

    const campaign = await Campaign.findOne({
      _id: campaignId,
      postedBy: userId,
    });
    if (!campaign) {
      return res
        .status(404)
        .json({ message: "Campaign not found or unauthorized" });
    }

    await Campaign.findByIdAndDelete(campaignId);
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
