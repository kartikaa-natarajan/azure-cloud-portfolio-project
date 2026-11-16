import { Router } from "express";
import { getDashboardStats } from "../controllers/statsController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getDashboardStats);

export default router;
