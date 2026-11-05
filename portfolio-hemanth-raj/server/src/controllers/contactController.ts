import { Request, Response } from "express";
import { z } from "zod";
import { ContactMessage } from "../models/ContactMessage";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { sendContactNotification, sendReplyEmail } from "../services/emailService";
import { requireAuth } from "../middleware/auth";
import { env } from "../config/env";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(2, "Subject is required"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

const replySchema = z.object({
  message: z.string().trim().min(2, "Reply message cannot be empty"),
});

function sanitize(input: string): string {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

function cleanSubject(sub: string): string {
  return sub.replace(/^Re:\s*/i, "").trim();
}

export const submitContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(400, "Please check your form fields", parsed.error.flatten());
  }

  const name = sanitize(parsed.data.name);
  const email = sanitize(parsed.data.email).toLowerCase();
  const subject = sanitize(parsed.data.subject);
  const message = sanitize(parsed.data.message);

  const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const saved = await ContactMessage.create({
    conversationId,
    sender: "visitor",
    name,
    email,
    subject,
    message,
    read: false,
  });

  try {
    await sendContactNotification({ name, email, subject, message });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[contact] Failed to send notification email:", err);
  }

  res.status(201).json({
    success: true,
    message: "Thanks for reaching out! I'll get back to you soon.",
    data: { id: saved.id, conversationId: saved.conversationId },
  });
});

export const handleInboundWebhook = asyncHandler(async (req: Request, res: Response) => {
  // Optional webhook secret check
  const secretHeader = req.headers["x-webhook-secret"] || req.query.secret;
  const configuredSecret = process.env.WEBHOOK_SECRET;
  if (configuredSecret && secretHeader !== configuredSecret) {
    throw new ApiError(401, "Invalid webhook secret authorization");
  }

  const body = req.body || {};

  // Extract providerMessageId for deduplication / idempotency
  const providerMessageId =
    body.providerMessageId ||
    body.MessageID ||
    body["message-id"] ||
    body.id ||
    req.headers["x-message-id"] ||
    null;

  if (providerMessageId) {
    const existing = await ContactMessage.findOne({ providerMessageId });
    if (existing) {
      // eslint-disable-next-line no-console
      console.log(`[contact webhook] Duplicate event skipped for providerMessageId: ${providerMessageId}`);
      res.status(200).json({ success: true, message: "Duplicate webhook event processed safely.", duplicate: true });
      return;
    }
  }

  // Parse sender, email, subject, message
  const rawEmail = body.email || body.fromEmail || body.from || body.sender || "";
  const rawName = body.name || body.fromName || rawEmail.split("@")[0] || "Visitor";
  const rawSubject = body.subject || "Re: Contact Conversation";
  const rawMessage = body.message || body.text || body.body || body["stripped-text"] || "";

  if (!rawEmail || !rawMessage) {
    throw new ApiError(400, "Missing required webhook fields (email and message)");
  }

  const email = sanitize(rawEmail).toLowerCase();
  const name = sanitize(rawName);
  const subject = sanitize(rawSubject);
  const message = sanitize(rawMessage);

  // Match existing conversation thread
  let conversationId = body.conversationId || req.query.conversationId;

  if (!conversationId) {
    // Match by base subject & email
    const baseSub = cleanSubject(subject);
    const existingMsg = await ContactMessage.findOne({
      email,
      $or: [
        { subject: new RegExp(`^Re:\\s*${baseSub}$`, "i") },
        { subject: new RegExp(`^${baseSub}$`, "i") },
      ],
    }).sort({ createdAt: -1 });

    if (existingMsg) {
      conversationId = existingMsg.conversationId;
    } else {
      conversationId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    }
  }

  const savedReply = await ContactMessage.create({
    conversationId,
    providerMessageId,
    sender: "visitor",
    name,
    email,
    subject,
    message,
    read: false,
  });

  // Mark conversation as unread so Admin Dashboard triggers unread badge
  await ContactMessage.updateMany({ conversationId }, { $set: { read: false } });

  // eslint-disable-next-line no-console
  console.log(`[contact webhook] Successfully registered incoming reply for conversation ${conversationId}`);

  res.status(201).json({
    success: true,
    message: "Inbound reply registered successfully",
    data: savedReply,
  });
});

export const replyToMessage = [
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsed = replySchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, "Please check your reply field", parsed.error.flatten());
    }

    const parentMessage = await ContactMessage.findById(id);
    if (!parentMessage) {
      throw new ApiError(404, "Target message not found");
    }

    const replyMessage = sanitize(parsed.data.message);
    const conversationId = parentMessage.conversationId || parentMessage.id;
    const replySubject = parentMessage.subject.toLowerCase().startsWith("re:")
      ? parentMessage.subject
      : `Re: ${parentMessage.subject}`;

    const adminReply = await ContactMessage.create({
      conversationId,
      parentId: parentMessage._id,
      sender: "admin",
      name: env.admin.name || "Hemanth Raj",
      email: env.email.user || "admin@example.com",
      subject: replySubject,
      message: replyMessage,
      read: true,
    });

    try {
      await sendReplyEmail({
        toEmail: parentMessage.email,
        toName: parentMessage.name,
        subject: replySubject,
        message: replyMessage,
        conversationId,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[contact] Failed to send outbound admin reply email:", err);
    }

    res.status(201).json({
      success: true,
      message: "Reply sent and stored in thread",
      data: adminReply,
    });
  }),
];

export const getMessages = [
  requireAuth,
  asyncHandler(async (_req: Request, res: Response) => {
    const rawMessages = await ContactMessage.find().sort({ createdAt: 1 });

    // Group messages by conversationId
    const map = new Map<string, any>();

    for (const msg of rawMessages) {
      const convId = msg.conversationId || msg.id;
      if (!map.has(convId)) {
        map.set(convId, {
          _id: msg._id,
          conversationId: convId,
          name: msg.name,
          email: msg.email,
          subject: msg.subject,
          message: msg.message,
          sender: msg.sender || "visitor",
          read: msg.read,
          createdAt: msg.createdAt,
          updatedAt: msg.updatedAt,
          replies: [],
        });
      } else {
        const root = map.get(convId);
        root.replies.push({
          _id: msg._id,
          parentId: msg.parentId,
          sender: msg.sender || "visitor",
          name: msg.name,
          email: msg.email,
          subject: msg.subject,
          message: msg.message,
          read: msg.read,
          createdAt: msg.createdAt,
        });
        // Update root timestamps and unread state
        if (new Date(msg.createdAt) > new Date(root.createdAt)) {
          root.updatedAt = msg.createdAt;
        }
        if (!msg.read) {
          root.read = false;
        }
      }
    }

    // Convert map to array sorted by latest activity descending
    const conversations = Array.from(map.values()).sort(
      (a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
    );

    res.json({ success: true, count: conversations.length, data: conversations });
  }),
];

export const markMessageRead = [
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const target = await ContactMessage.findById(req.params.id);
    if (!target) throw new ApiError(404, "Message not found");

    const isRead = req.body.read ?? true;
    const conversationId = target.conversationId || target.id;

    await ContactMessage.updateMany({ conversationId }, { $set: { read: isRead } });

    res.json({ success: true, message: `Conversation marked as ${isRead ? "read" : "unread"}` });
  }),
];

export const deleteMessage = [
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const target = await ContactMessage.findById(req.params.id);
    if (!target) throw new ApiError(404, "Message not found");

    const conversationId = target.conversationId || target.id;
    await ContactMessage.deleteMany({ conversationId });

    res.json({ success: true, message: "Conversation thread deleted" });
  }),
];
