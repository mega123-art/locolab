import { Notification } from "../models/notificationModel.js";
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({
      recipient: userId,
    }).populate("campaign");
    res
      .status(200)
      .json({ message: "Notifications fetched successfully", notifications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res
      .status(200)
      .json({ message: "Notification marked as read", notification });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
