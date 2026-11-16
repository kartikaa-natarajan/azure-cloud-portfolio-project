import { Router } from "express";
import {
  getGithubProfile,
  getGithubRepositories,
  getGithubStats,
  syncGithubProjects,
} from "../controllers/githubController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/profile", getGithubProfile);
router.get("/repositories", getGithubRepositories);
router.get("/stats", getGithubStats);
router.post("/sync", requireAuth, syncGithubProjects);

export default router;
