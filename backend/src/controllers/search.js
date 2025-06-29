import { User } from "../models/userModel.js";
export const searchCreators = async (req, res) => {
  try {
    const {
      searchTerm,
      location,
      maxDistance,
      followers,
      niche,
      languages,
      sortBy,
    } = req.query;

    // Base query for creators only
    const query = { role: "Creator" };

    // Search term filter (name or niche)
    if (searchTerm) {
      query.$or = [
        { fullName: new RegExp(searchTerm, "i") }, // Case-insensitive match
        { niche: new RegExp(searchTerm, "i") },
      ];
    }

    // Location filter (exact match for now, can be extended to lat/lon)
    if (location) {
      query.location = location;
    }

    // Follower count filter
    if (followers) {
      query.followers = { $gte: Number(followers) };
    }

    // Niche filter
    if (niche) {
      query.niche = new RegExp(niche, "i");
    }

    // Language filter
    if (languages) {
      query.languages = { $in: languages.split(",") };
    }

    // Fetch creators with sorting
    const sortOptions = {};
    if (sortBy === "followers") sortOptions.followers = -1; // Descending order
    if (sortBy === "price") sortOptions.price = 1; // Ascending order (if added later)

    const creators = await User.find(query).sort(sortOptions);

    res
      .status(200)
      .json({ message: "Creators fetched successfully", creators });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};