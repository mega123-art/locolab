import mongoose from "mongoose";
const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      // enum: ["Event", "Competition", "Product Promo", "Other"],
      required: true,
    },
    location: { type: String, required: true },
    maxDistance: { type: Number, required: true },
    budgetRange: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    rewardType: { type: String, enum: ["Barter", "Money"], required: true }, 
    images: [{ type: String }],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Campaign = mongoose.model("Campaign", campaignSchema);
