import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB(): Promise<void> {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(env.mongoUri);
    // eslint-disable-next-line no-console
    console.log(`[db] Connected to MongoDB at ${maskUri(env.mongoUri)}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[db] MongoDB connection failed:", err);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    // eslint-disable-next-line no-console
    console.warn("[db] MongoDB disconnected");
  });
}

function maskUri(uri: string): string {
  return uri.replace(/\/\/(.*):(.*)@/, "//***:***@");
}
