import { Router } from "express";
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getAchievements);
router.post("/", requireAuth, createAchievement);
router.put("/:id", requireAuth, updateAchievement);
router.delete("/:id", requireAuth, deleteAchievement);

export default router;
