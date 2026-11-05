import { Schema, model, Document, Types } from "mongoose";

export interface IContactMessage extends Document {
  conversationId: string;
  parentId?: Types.ObjectId | string;
  providerMessageId?: string;
  sender: "visitor" | "admin";
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    conversationId: { type: String, required: true, index: true },
    parentId: { type: Schema.Types.ObjectId, ref: "ContactMessage", default: null },
    providerMessageId: { type: String, default: null, index: true },
    sender: { type: String, enum: ["visitor", "admin"], default: "visitor" },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });
contactMessageSchema.index({ conversationId: 1, createdAt: 1 });
contactMessageSchema.index({ providerMessageId: 1 }, { sparse: true });

export const ContactMessage = model<IContactMessage>("ContactMessage", contactMessageSchema);

