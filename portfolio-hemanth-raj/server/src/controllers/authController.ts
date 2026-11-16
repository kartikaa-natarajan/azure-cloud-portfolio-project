import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { signToken } from "../middleware/auth";
import { env } from "../config/env";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = asyncHandler(async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Invalid credentials payload", parsed.error.flatten());
  }
  const { email, password } = parsed.data;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  res.cookie(env.cookieName, token, cookieOptions);

  res.json({
    success: true,
    data: { id: user.id, name: user.name, email: user.email, role: user.role },
    token,
  });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie(env.cookieName);
  res.json({ success: true, message: "Logged out" });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Not authenticated");
  const user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, data: { id: user.id, name: user.name, email: user.email, role: user.role } });
});
