import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Locales } from "shared/types";
import shoppingRoutes from "./api/routes/shoppingRoutes";

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/shopping";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", async (_req, res) => {
  if (!mongoose.connection.readyState) {
    return res.status(503).json({ status: "db not ready" });
  }
  res.json({ status: "ok" });
});

// Route to get supported languages
app.get("/languages", (_req, res) => {
  res.json({ languages: Object.values(Locales) });
});

// shopping API
app.use("/shopping", shoppingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
