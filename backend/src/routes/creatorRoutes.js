import express from "express";
import { updateCreatorProfile } from "../controllers/creatorController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.patch("/profile", authenticateUser, updateCreatorProfile);
export default router;
