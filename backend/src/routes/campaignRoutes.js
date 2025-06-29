import express from "express";
import { createCampaign ,listCampaigns,deleteCampaign} from "../controllers/campaignControllers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/imageUpload.js";
const router = express.Router();
router.post("/", authenticateUser, upload,createCampaign);
router.get("/", authenticateUser, listCampaigns);
router.delete("/:campaignId", authenticateUser, deleteCampaign);
export default router;
