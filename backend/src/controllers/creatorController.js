import { User } from "../models/userModel.js";

export const getCreatorStats = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const creator = await User.findOne(
      { _id: creatorId, role: "Creator" },
      "fullName followers niche languages location"
    );

    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }

    res
      .status(200)
      .json({ message: "Creator stats fetched successfully", creator });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updateCreatorProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (user.role !== "Creator") {
      return res
        .status(403)
        .json({ message: "Only creators can update their profiles" });
    }

    const { followers, niche, languages } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { followers, niche, languages },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// export const getAllCreators = async (req, res) => {
//   try {
//     const { location, niche, minFollowers, maxFollowers, languages } =
//       req.query;

//     const query = { role: "Creator" };
//     if (location) query.location = location;
//     if (niche) query.niche = niche;
//     if (minFollowers || maxFollowers) {
//       query.followers = {};
//       if (minFollowers) query.followers.$gte = parseInt(minFollowers, 10);
//       if (maxFollowers) query.followers.$lte = parseInt(maxFollowers, 10);
//     }
//     if (languages) query.languages = { $in: languages.split(",") };

//     const creators = await User.find(
//       query,
//       "followers niche languages location _id"
//     )
//       .sort({ followers: -1 })
//       .limit(50);

//     res
//       .status(200)
//       .json({ message: "Creators fetched successfully", creators });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
