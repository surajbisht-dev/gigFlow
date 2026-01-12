import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import authRoutes from "./routes/authRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "GigFlow backend is running successfully ",
  });
});
