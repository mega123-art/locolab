import express from "express";
import { updateCreatorProfile,getCreatorStats } from "../controllers/creatorController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/:creatorId/stats", authenticateUser, getCreatorStats);
router.patch("/profile", authenticateUser, updateCreatorProfile);
export default router;
