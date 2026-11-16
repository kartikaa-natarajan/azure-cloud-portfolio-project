import { Router } from "express";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);
router.post("/", requireAuth, createProject);
router.put("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;
