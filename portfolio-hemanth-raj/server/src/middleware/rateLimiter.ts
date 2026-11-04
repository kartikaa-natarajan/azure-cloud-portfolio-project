import rateLimit from "express-rate-limit";
import { env } from "../config/env";

export const generalLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.nodeEnv === "development" ? 1000 : env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.nodeEnv === "development" ? 200 : 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Please try again later." },
});

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: env.nodeEnv === "development" ? 100 : 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many messages sent. Please try again later." },
});

