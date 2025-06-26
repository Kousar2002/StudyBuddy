// const express=require("express");
// const dotenv=require("dotenv");
// const cors = require('cors');
// const connectDB=require("./config/db");
// const authRoutes=require("./routes/authRoutes")
// const profileRoutes=require("./routes/profile")
// const subjectRoutes=require("./routes/subjects");
// // const authRoutes=require("")
// dotenv.config();
// connectDB()
// const app=express();
// app.use(cors({
//   origin: 'http://localhost:5173', // your frontend URL
//   methods: ['GET', 'POST'],
//   credentials: true,
// }));

// app.use(express.json());
// app.use("/api/auth",authRoutes);
// app.use("/api", profileRoutes);
// app.use('/api/subjects',subjectRoutes);
// const PORT=process.env.PORT||5000;
// app.listen(PORT,()=>{
//     console.log(`server running on port ${PORT}`);
// })
// Core modules
import express from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";

// Third-party modules
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";

// Internal modules
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profile.js";
import subjectRoutes from "./routes/subjects.js";
import chatRoutes from "./routes/chatRoutes.js";
import uploadRoute from "./routes/upload.js";
import Message from "./models/Message.js";
import audioUploadRoute from "./routes/upload.js";

// Config
dotenv.config();
connectDB();

// App and server setup
const app = express();
const server = http.createServer(app);
// const allowedOrigins = process.env.ALLOWED_ORIGINS
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5173"];

console.log(allowedOrigins)

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/chat", chatRoutes);
app.use("/upload", uploadRoute);
app.use("/uploads", express.static(path.resolve('uploads')));
app.use("/api/upload", audioUploadRoute);


io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("joinRoom", async ({ room }) => {
    socket.join(room);
    const messages = await Message.find({ room }).sort({ createdAt: 1 });
    socket.emit("loadMessages", messages);
  });

  socket.on("sendMessage", async ({ room, type, text, audio, fileUrl, sender, receiver }) => {
    const newMsg = new Message({ room, type, text, audio, fileUrl, sender, receiver });
    await newMsg.save();
    io.to(room).emit("receiveMessage", newMsg);
  });
});


// Server start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
