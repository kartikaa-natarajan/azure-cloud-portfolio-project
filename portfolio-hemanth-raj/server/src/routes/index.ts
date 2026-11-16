import { Router } from "express";
import authRoutes from "./authRoutes";
import projectRoutes from "./projectRoutes";
import skillRoutes from "./skillRoutes";
import experienceRoutes from "./experienceRoutes";
import educationRoutes from "./educationRoutes";
import achievementRoutes from "./achievementRoutes";
import contactRoutes from "./contactRoutes";
import githubRoutes from "./githubRoutes";
import profileRoutes from "./profileRoutes";
import statsRoutes from "./statsRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);
router.use("/experience", experienceRoutes);
router.use("/education", educationRoutes);
router.use("/achievements", achievementRoutes);
router.use("/contact", contactRoutes);
router.use("/github", githubRoutes);
router.use("/stats", statsRoutes);

router.get("/health", (_req, res) => {
  res.json({ success: true, message: "API is healthy", timestamp: new Date().toISOString() });
});

export default router;

