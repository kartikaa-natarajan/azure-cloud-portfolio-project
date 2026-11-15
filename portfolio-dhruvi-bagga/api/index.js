const { app } = require("@azure/functions");
const mongoose = require("mongoose");

let mongoConnection = null;

// Contact schema
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Contact model
const Contact =
  mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);

// MongoDB connection
async function connectToMongoDB() {
  if (mongoConnection) {
    return mongoConnection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI environment variable is not configured."
    );
  }

  mongoConnection = mongoose.connect(process.env.MONGODB_URI);

  return mongoConnection;
}

// Health check
app.http("health", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "health",

  handler: async () => {
    try {
      if (!process.env.MONGODB_URI) {
        return {
          status: 500,
          jsonBody: {
            status: "error",
            message: "MONGODB_URI is NOT configured in Azure."
          }
        };
      }

      await connectToMongoDB();

      return {
        status: 200,
        jsonBody: {
          status: "success",
          message: "Portfolio API and MongoDB are working!"
        }
      };
    } catch (error) {
      console.error("MongoDB health check failed:", error);

      return {
        status: 500,
        jsonBody: {
          status: "error",
          errorName: error.name,
          message: error.message
        }
      };
    }
  }
});

// Contact form
app.http("contact", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "contact",

  handler: async (request) => {
    try {
      const body = await request.json();

      const { name, email, message } = body;

      // Validate input
      if (!name || !email || !message) {
        return {
          status: 400,
          jsonBody: {
            success: false,
            message: "Name, email, and message are required."
          }
        };
      }

      // Connect to MongoDB
      await connectToMongoDB();

      // Create contact document
      const newContact = new Contact({
        name,
        email,
        message
      });

      // Save to MongoDB
      await newContact.save();

      return {
        status: 201,
        jsonBody: {
          success: true,
          message: "Your message has been received!"
        }
      };
    } catch (error) {
      console.error(
        "Contact submission error:",
        error
      );

      return {
        status: 500,
        jsonBody: {
          success: false,
          message: "Something went wrong. Please try again."
        }
      };
    }
  }
});