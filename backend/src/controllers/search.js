import { User } from "../models/userModel.js";

export const searchCreators = async (req, res) => {
  try {
    const {
      searchTerm,
      latitude,
      longitude,
      maxDistance, // in kilometers
      followers,
      niche,
      languages,
      sortBy,
      page = 1,
      limit = 20,
    } = req.query;

    // Base query for creators only
    const query = { role: "Creator" };

    // Search term filter
    if (searchTerm) {
      query.$or = [
        { fullName: new RegExp(searchTerm, "i") },
        { niche: new RegExp(searchTerm, "i") },
      ];
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

    // Location radius filter
    if (latitude && longitude && maxDistance) {
      query.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseFloat(maxDistance) * 1000, // Convert km to meters
        },
      };
    }

    // Sorting options
    const sortOptions = {};
    if (sortBy === "followers") sortOptions.followers = -1; // Descending
    if (!sortBy) sortOptions.followers = -1; // Default sort by followers

    // Pagination and Fetching
    const creators = await User.find(query)
      .sort(sortOptions)
      .skip((page - 1) * parseInt(limit, 10))
      .limit(parseInt(limit, 10));

    res.status(200).json({
      message: "Creators fetched successfully",
      creators,
      currentPage: page,
      total: creators.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
