import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Message from "../models/Message.js";

const router = express.Router();

// Get all messages between logged in user and buddy
router.get("/:buddyId", protect, async (req, res) => {
  const buddyId = req.params.buddyId;
  const room = [req.user.id, buddyId].sort().join("-");
  try {
    const messages = await Message.find({ room }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error getting messages" });
  }
});

export default router;
// import chatRoutes from './routes/chatRoutes.js';
// app.use("/api/chat", chatRoutes);
