import { User } from "../models/userModel.js";
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
