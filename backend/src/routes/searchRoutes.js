import express from "express";
import { searchCreators } from "../controllers/search.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/creators", authenticateUser, searchCreators);
export default router;
