import express from "express"
import { getNotifications,markNotificationAsRead } from "../controllers/notificationController.js"
import { authenticateUser } from "../middlewares/authMiddleware.js"
const router = express.Router();

router.get("/", authenticateUser, getNotifications);
router.patch("/:notificationId/read", authenticateUser, markNotificationAsRead);
export default router