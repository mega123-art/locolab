const mongoose = require("mongoose");
const creatorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    location: String,
    numberOfPosts: Number,
    avgLikes: Number,
    avgComments: Number,
    totalUploads: Number,
    postsPerWeek: Number,
    engagementRate: Number,
    topHashtags: [String],
    latestPosts: [String],
    about: String,
    niche: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CreatorProfile", creatorProfileSchema);
