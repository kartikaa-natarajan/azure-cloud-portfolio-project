import nodemailer from "nodemailer";
import { env } from "../config/env";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!env.email.host || !env.email.user || !env.email.password) {
    return null;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.email.host,
      port: env.email.port,
      secure: env.email.secure,
      auth: {
        user: env.email.user,
        pass: env.email.password,
      },
    });
  }
  return transporter;
}

interface ContactNotification {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(payload: ContactNotification): Promise<boolean> {
  const t = getTransporter();
  if (!t) {
    // eslint-disable-next-line no-console
    console.warn("[email] EMAIL_* env vars not configured — skipping notification email.");
    return false;
  }

  await t.sendMail({
    from: `"Portfolio Contact Form" <${env.email.user}>`,
    to: env.email.to,
    replyTo: payload.email,
    subject: `New portfolio message: ${payload.subject}`,
    text: `From: ${payload.name} <${payload.email}>\n\n${payload.message}`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(payload.name)} (${escapeHtml(payload.email)})</p>
      <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
    `,
  });

  return true;
}

interface ReplyPayload {
  toEmail: string;
  toName: string;
  subject: string;
  message: string;
  conversationId: string;
}

export async function sendReplyEmail(payload: ReplyPayload): Promise<boolean> {
  const t = getTransporter();
  if (!t) {
    // eslint-disable-next-line no-console
    console.warn("[email] EMAIL_* env vars not configured — skipping reply email.");
    return false;
  }

  const subject = payload.subject.toLowerCase().startsWith("re:")
    ? payload.subject
    : `Re: ${payload.subject}`;

  await t.sendMail({
    from: `"${env.admin.name}" <${env.email.user}>`,
    to: payload.toEmail,
    subject,
    text: payload.message,
    headers: {
      "In-Reply-To": `<thread-${payload.conversationId}@hemanthraj-portfolio>`,
      References: `<thread-${payload.conversationId}@hemanthraj-portfolio>`,
      "X-Conversation-ID": payload.conversationId,
    },
    html: `
      <p>Hi ${escapeHtml(payload.toName)},</p>
      <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
      <br/>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #64748b;">
        This email is in reply to your conversation on Hemanth Raj Portfolio (Thread ID: ${payload.conversationId}).
      </p>
    `,
  });

  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

