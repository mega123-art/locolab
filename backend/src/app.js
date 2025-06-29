import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import creatorRoutes from "./routes/creatorRoutes.js"
import searchRoutes from "./routes/searchRoutes.js"
dotenv.config();
connectdb();
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/creators", creatorRoutes);
export default app;
