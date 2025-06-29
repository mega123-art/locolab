import express from "express";
import { createCampaign ,listCampaigns,deleteCampaign} from "../controllers/campaignControllers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/", authenticateUser, createCampaign);
router.get("/", authenticateUser, listCampaigns);
router.delete("/:campaignId", authenticateUser, deleteCampaign);
export default router;
