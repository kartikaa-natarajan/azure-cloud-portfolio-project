const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Portfolio backend is running!");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "Portfolio API is working!"
    });
});

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required."
            });
        }

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Your message has been received!"
        });

    } catch (error) {
        console.error("Contact submission error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again."
        });
    }
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });