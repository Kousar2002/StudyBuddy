// import mongoose from 'mongoose';

// const messageSchema = new mongoose.Schema({
//   type: String,
//   text: String,
//   audio: String,
//   fileUrl: String,
//   sender: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   receiver: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   room: {
//     type: String,
//     required: true
//   },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Message', messageSchema);


// import mongoose from 'mongoose';

// const messageSchema = new mongoose.Schema({
//   type: String,
//   text: String,
//   audio: String,
//   fileUrl: String,
//   sender: String,
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Message', messageSchema);

// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//   room: String,
//   type: String, // "text", "audio", "file"
//   text: String,
//   audio: String,
//   fileUrl: String,
//   sender: { type: String, required: true },
//   receiver: { type: String, required: true },
// }, { timestamps: true });

// const Message = mongoose.model("Message", messageSchema);
// export default Message;

 import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true }, 
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  type: { type: String, enum: ['text', 'audio', 'file'], required: true },
  text: String,
  audio: String,
  fileUrl: String,
 
  // timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

// module.exports = mongoose.model('Message', messageSchema);
const Message = mongoose.model("Message", messageSchema);
export default Message;
