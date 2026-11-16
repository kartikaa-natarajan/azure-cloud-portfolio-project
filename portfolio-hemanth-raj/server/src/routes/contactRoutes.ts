import { Router } from "express";
import {
  submitContactMessage,
  handleInboundWebhook,
  replyToMessage,
  getMessages,
  markMessageRead,
  deleteMessage,
} from "../controllers/contactController";
import { contactLimiter } from "../middleware/rateLimiter";

const router = Router();

router.post("/", contactLimiter, submitContactMessage);
router.post("/webhook", handleInboundWebhook);
router.post("/inbound", handleInboundWebhook);
router.post("/:id/reply", ...replyToMessage);
router.get("/", ...getMessages);
router.patch("/:id/read", ...markMessageRead);
router.delete("/:id", ...deleteMessage);

export default router;
