// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   TextField,
//   Button,
//   Box,
//   Paper,
// } from "@mui/material";

// const socket = io("http://localhost:5000"); // your backend socket server URL

// const ChatPage = () => {
//   const { userId } = useParams(); // chatting with this user
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [receiverName, setReceiverName] = useState("");
//   const messagesEndRef = useRef(null);

//   const currentUser = JSON.parse(localStorage.getItem("user")); // Assumes you stored logged-in user info

//   useEffect(() => {
//     const fetchReceiver = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await res.json();
//         setReceiverName(data.name);
//       } catch (err) {
//         console.error("Failed to fetch user info:", err);
//       }
//     };

//     fetchReceiver();

//     socket.emit("joinRoom", {
//       senderId: currentUser._id,
//       receiverId: userId,
//     });

//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const msgData = {
//       senderId: currentUser._id,
//       receiverId: userId,
//       text: message,
//       timestamp: new Date().toISOString(),
//     };

//     socket.emit("sendMessage", msgData);
//     setMessages((prev) => [...prev, msgData]);
//     setMessage("");
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Chat with {receiverName || "User"}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Container sx={{ mt: 4 }}>
//         <Paper
//           elevation={3}
//           sx={{
//             p: 2,
//             mb: 2,
//             height: "60vh",
//             overflowY: "auto",
//             backgroundColor: "#f9f9f9",
//           }}
//         >
//           {messages.map((msg, idx) => (
//             <Box
//               key={idx}
//               sx={{
//                 display: "flex",
//                 justifyContent:
//                   msg.senderId === currentUser._id ? "flex-end" : "flex-start",
//                 mb: 1,
//               }}
//             >
//               <Box
//                 sx={{
//                   backgroundColor:
//                     msg.senderId === currentUser._id ? "#2196f3" : "#e0e0e0",
//                   color: msg.senderId === currentUser._id ? "#fff" : "#000",
//                   p: 1.5,
//                   borderRadius: 2,
//                   maxWidth: "60%",
//                 }}
//               >
//                 {msg.text}
//               </Box>
//             </Box>
//           ))}
//           <div ref={messagesEndRef} />
//         </Paper>

//         <Box display="flex" gap={2}>
//           <TextField
//             fullWidth
//             placeholder="Type your message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <Button variant="contained" onClick={sendMessage}>
//             Send
//           </Button>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default ChatPage;
// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000");

// const ChatPage = ({ currentUser, selectedUser }) => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [audioFile, setAudioFile] = useState(null);
//   const [fileUpload, setFileUpload] = useState(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     socket.emit("join", { userId: currentUser._id });

//     socket.on("receive_message", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => socket.disconnect();
//   }, [currentUser]);

//   const sendMessage = async () => {
//     if (text.trim() === "") return;
//     const message = {
//       sender: currentUser._id,
//       receiver: selectedUser._id,
//       type: "text",
//       content: text,
//     };
//     socket.emit("send_message", message);
//     setMessages((prev) => [...prev, message]);
//     setText("");
//   };

//   const sendAudio = async () => {
//     if (!audioFile) return;
//     const formData = new FormData();
//     formData.append("audio", audioFile);
//     try {
//       const res = await axios.post("http://localhost:5000/api/upload/audio", formData);
//       const message = {
//         sender: currentUser._id,
//         receiver: selectedUser._id,
//         type: "audio",
//         content: res.data.fileUrl,
//       };
//       socket.emit("send_message", message);
//       setMessages((prev) => [...prev, message]);
//       setAudioFile(null);
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   const sendFile = async () => {
//     if (!fileUpload) return;
//     const formData = new FormData();
//     formData.append("file", fileUpload);
//     try {
//       const res = await axios.post("http://localhost:5000/api/upload/file", formData);
//       const message = {
//         sender: currentUser._id,
//         receiver: selectedUser._id,
//         type: "file",
//         content: res.data.fileUrl,
//       };
//       socket.emit("send_message", message);
//       setMessages((prev) => [...prev, message]);
//       setFileUpload(null);
//     } catch (err) {
//       console.error("File upload error:", err);
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div style={{ maxWidth: 800, margin: "auto" }}>
//       {/* <h2>Chat with {selectedUser.name}</h2> */}
//       <div
//         style={{
//           border: "1px solid gray",
//           padding: 10,
//           height: 400,
//           overflowY: "scroll",
//           marginBottom: 10,
//         }}
//       >
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               textAlign: msg.sender === currentUser._id ? "right" : "left",
//               marginBottom: 5,
//             }}
//           >
//             {msg.type === "text" && <p>{msg.content}</p>}
//             {msg.type === "audio" && <audio controls src={msg.content} />}
//             {msg.type === "file" && (
//               <a href={msg.content} target="_blank" rel="noreferrer">
//                 Download File
//               </a>
//             )}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={sendMessage}>Send</button>

//       <div>
//         <label>Send Audio:</label>
//         <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} />
//         <button onClick={sendAudio}>Upload Audio</button>
//       </div>

//       <div>
//         <label>Upload File:</label>
//         <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
//         <button onClick={sendFile}>Upload File</button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import axios from "axios";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
// } from "@mui/material";

// const socket = io("http://localhost:5000");

// const ChatPage = () => {
//   const { id: selectedUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [currentUser, setCurrentUser] = useState(null);
//   const fileInputRef = useRef(null);

//   // useEffect(() => {
//   //   const user = JSON.parse(localStorage.getItem("userdata"));
//   //   console.log(user);
//   //   setCurrentUser(user);

//   //   socket.emit("join", user._id);

//   //   socket.on("receiveMessage", (msg) => {
//   //     setMessages((prev) => [...prev, msg]);
//   //   });

//   //   return () => {
//   //     socket.off("receiveMessage");
//   //   };
//   // }, []);
//   useEffect(() => {
//   const storedUser = localStorage.getItem("userdata");
//   if (!storedUser) return;

//   const parsedUser = typeof storedUser === "string" ? JSON.parse(storedUser) : storedUser;
//   setCurrentUser(parsedUser);
//   if (!parsedUser?._id) return;

//   socket.emit("join", parsedUser._id); // important!
  
//   socket.on("receiveMessage", (msg) => {
//     setMessages((prev) => [...prev, msg]);
//   });

//   return () => {
//     socket.off("receiveMessage");
//   };
// }, []);


//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/chat/${selectedUserId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setMessages(res.data);
//       } catch (err) {
//         console.error("Error loading messages:", err);
//       }
//     };
//     fetchMessages();
//   }, [selectedUserId]);

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const message = {
//       senderId: currentUser._id,
//       receiverId: selectedUserId,
//       text: input,
//       timestamp: new Date(),
//     };

//     socket.emit("sendMessage", message);
//     setMessages((prev) => [...prev, message]);
//     setInput("");
//   };

//   const handleFileUpload = async (file) => {
//     const token = localStorage.getItem("token");
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post("http://localhost:5000/api/upload", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const msg = {
//         senderId: currentUser._id,
//         receiverId: selectedUserId,
//         fileUrl: res.data.fileUrl,
//         fileType: file.type,
//         text: "",
//         timestamp: new Date(),
//       };

//       socket.emit("sendMessage", msg);
//       setMessages((prev) => [...prev, msg]);
//     } catch (err) {
//       console.error("Upload error:", err);
//     }
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h5" gutterBottom>
//         Chat with User {selectedUserId}
//       </Typography>

//       <Paper style={{ maxHeight: 400, overflow: "auto", marginBottom: 16 }}>
//         <List>
//           {messages.map((msg, idx) => (
//             <ListItem key={idx} alignItems="flex-start">
//               <ListItemText
//                 primary={
//                   msg.fileUrl ? (
//                     msg.fileType?.startsWith("audio") ? (
//                       <audio controls src={msg.fileUrl}></audio>
//                     ) : msg.fileType?.startsWith("image") ? (
//                       <img
//                         src={msg.fileUrl}
//                         alt="shared"
//                         style={{ maxWidth: "200px" }}
//                       />
//                     ) : (
//                       <a
//                         href={msg.fileUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         Download File
//                       </a>
//                     )
//                   ) : (
//                     msg.text
//                   )
//                 }
//                 secondary={`From: ${msg.senderId}`}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>

//       <Box display="flex" gap={1}>
//         <TextField
//           fullWidth
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message"
//         />
//         <Button variant="contained" onClick={sendMessage}>
//           Send
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={() => fileInputRef.current.click()}
//         >
//           Upload
//         </Button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//           onChange={(e) => handleFileUpload(e.target.files[0])}
//           accept="audio/*,image/*,application/pdf"
//         />
//       </Box>
//     </Box>
//   );
// };

// export default ChatPage;

// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// import AudioRecorder from './AudioRecorder';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Stack,
//   Card,
//   CardContent,
//   IconButton,
//   Paper,
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// const socket = io("http://localhost:5000");
// const ChatPage=()=>{
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [file, setFile] = useState(null);
//   const [myId, setMyId] = useState(null);

//   // useEffect(() => {
//   //   socket.on('connect', () => {
//   //     setMyId(socket.id);
//   //   });

//   //   socket.on('receiveMessage', (msg) => {
//   //     setMessages((prev) => [...prev, msg]);
//   //   });

//   //   return () => {
//   //     socket.off('connect');
//   //     socket.off('receiveMessage');
//   //   };
//   // }, []);
// //   useEffect(() => {
// //   socket.on("connect", () => {
// //     setMyId(socket.id);
// //   });

// //   socket.on("chatHistory", (history) => {
// //     setMessages(history); // load previous messages
// //   });

// //   socket.on("receiveMessage", (msg) => {
// //     setMessages((prev) => [...prev, msg]);
// //   });

// //   return () => {
// //     socket.off("connect");
// //     socket.off("chatHistory");
// //     socket.off("receiveMessage");
// //   };
// // }, []);
//  useEffect(() => {
//   socket.on("connect", () => {
//     setMyId(socket.id);
//   });
//   // let userId = localStorage.getItem("userId");
//   // if (!userId) {
//   //   userId = crypto.randomUUID(); // Generate a unique user ID
//   //   localStorage.setItem("userId", userId);
//   // }
//   // setMyId(userId);

//   socket.on("loadMessages", (history) => {
//     setMessages(history); // ✅ this now matches the backend
//   });

//   socket.on("receiveMessage", (msg) => {
//     setMessages((prev) => [...prev, msg]);
//   });

//   return () => {
//     socket.off("connect");
//     socket.off("loadMessages");
//     socket.off("receiveMessage");
//   };
// }, []);


//   const sendText = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", {
//   type: "text",
//   text: message,
//   sender: myId,
// });

//       setMessage('');
//     }
//   };

//   const sendAudio = (blob) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       socket.emit("sendMessage", {
//   type: "audio",
//   audio: reader.result,
//   sender: myId,
// });

//     };
//     reader.readAsDataURL(blob);
//   };

//   const uploadFile = async () => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append('file', file);

//     const res = await fetch('http://localhost:3000/upload', {
//       method: 'POST',
//       body: formData,
//     });
//     const data = await res.json();
//     socket.emit("sendMessage", {
//   type: "file",
//   fileUrl: data.fileUrl,
//   sender: myId,
// });


//     setFile(null);
//   };

//   return (
//     <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         💬 Chat App
//       </Typography>

//       <Paper elevation={3} sx={{ height: 400, overflowY: 'auto', p: 2, mb: 2 }}>
//         <Stack spacing={2}>
//           {messages.map((msg, index) => {
//             const isMine = msg.sender === myId;
//             return (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: isMine ? 'flex-end' : 'flex-start',
//                 }}
//               >
//                 <Card
//                   sx={{
//                     backgroundColor: isMine ? '#dcf8c6' : '#f1f0f0',
//                     maxWidth: '75%',
//                   }}
//                 >
//                   <CardContent>
//                     {msg.type === 'text' && (
//                       <Typography>{msg.text}</Typography>
//                     )}
//                     {msg.type === 'audio' && (
//                       <audio controls src={msg.audio}></audio>
//                     )}
//                     {msg.type === 'file' && (
//                       <Button
//                         href={msg.fileUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         variant="outlined"
//                         startIcon={<UploadFileIcon />}
//                       >
//                         Open File
//                       </Button>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Box>
//             );
//           })}
//         </Stack>
//       </Paper>

//       <Stack direction="row" spacing={1} alignItems="center" mb={2}>
//         <TextField
//           fullWidth
//           label="Type a message"
//           variant="outlined"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <IconButton onClick={sendText} color="primary">
//           <SendIcon />
//         </IconButton>
//       </Stack>

//       <Stack direction="row" spacing={2} alignItems="center">
//         <AudioRecorder onRecordingComplete={sendAudio} />
//         <Button
//           variant="contained"
//           component="label"
//           startIcon={<UploadFileIcon />}
//         >
//           Choose File
//           <input
//             type="file"
//             hidden
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//         </Button>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={uploadFile}
//           disabled={!file}
//         >
//           Upload & Send
//         </Button>
//       </Stack>
//     </Box>
//   );

// }
// export default ChatPage;


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const ChatPage = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [myId, setMyId] = useState("");
//   const [buddyId, setBuddyId] = useState(null);
//   const [roomId, setRoomId] = useState(null);

//   useEffect(() => {
    
//     const user = JSON.parse(localStorage.getItem("userdata"));
//     console.log(user?._id);
//     const uid=user?._id
//     const bid = localStorage.getItem("buddyId");
//     console.log(bid)
//     const room = [uid, bid].sort().join("-");

//     setMyId(uid);
//     setBuddyId(bid);
//     setRoomId(room);

//     socket.emit("joinRoom", { room });

//     socket.on("loadMessages", (history) => setMessages(history));
//     socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));

//     return () => {
//       socket.off("joinRoom");
//       socket.off("loadMessages");
//       socket.off("receiveMessage");
//     };
//   }, []);

//   const sendText = () => {
//     const user = JSON.parse(localStorage.getItem("userdata"));
//     console.log(user?._id);
//     if (!message.trim()) return;

//     socket.emit("sendMessage", {
//       room: roomId,
//       type: "text",
//       text: message,
//       sender: user?._id,
//       receiver: buddyId,
//     });
//     setMessage("");
//   };

//   return (
//     <div>
//       <h2>Chat</h2>
//       <div style={{ maxHeight: 300, overflowY: "scroll" }}>
//         {messages.map((msg, i) => (
//           <div key={i} style={{ textAlign: msg.sender === myId ? "right" : "left" }}>
//             {msg.type === "text" && <p>{msg.text}</p>}
//           </div>
//         ))}
//       </div>
//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type message"
//       />
//       <button onClick={sendText}>Send</button>
//     </div>
//   );
// };

// export default ChatPage;


// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Stack,
//   Card,
//   CardContent,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import AudioRecorder from "./AudioRecorder"; // make sure this component exists

// const socket = io("http://localhost:5000");

// const ChatPage = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [file, setFile] = useState(null);
//   const [myId, setMyId] = useState(null);
//   const [buddyId, setBuddyId] = useState(null);
//   const [roomId, setRoomId] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userdata"));
//     const uid = user?._id;
//     const bid = localStorage.getItem("buddyId");

//     const room = [uid, bid].sort().join("-");
//     setMyId(uid);
//     setBuddyId(bid);
//     setRoomId(room);

//     socket.emit("joinRoom", { room });

//     socket.on("loadMessages", (history) => setMessages(history));
//     socket.on("receiveMessage", (msg) => setMessages((prev) => [...prev, msg]));

//     return () => {
//       socket.off("joinRoom");
//       socket.off("loadMessages");
//       socket.off("receiveMessage");
//     };
//   }, []);

//   const sendText = () => {
//     if (!message.trim()) return;

//     socket.emit("sendMessage", {
//       room: roomId,
//       type: "text",
//       text: message,
//       sender: myId,
//       receiver: buddyId,
//     });

//     setMessage("");
//   };

//   const sendAudio = (blob) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       socket.emit("sendMessage", {
//         room: roomId,
//         type: "audio",
//         audio: reader.result,
//         sender: myId,
//         receiver: buddyId,
//       });
//     };
//     reader.readAsDataURL(blob);
//   };

//   const uploadFile = async () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch("http://localhost:5000/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     socket.emit("sendMessage", {
//       room: roomId,
//       type: "file",
//       fileUrl: data.fileUrl,
//       sender: myId,
//       receiver: buddyId,
//     });

//     setFile(null);
//   };

//   return (
//     <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         💬 Chat App
//       </Typography>

//       <Paper elevation={3} sx={{ height: 400, overflowY: "auto", p: 2, mb: 2 }}>
//         <Stack spacing={2}>
//           {messages.map((msg, index) => {
//             const isMine = msg.sender === myId;
//             return (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   justifyContent: isMine ? "flex-end" : "flex-start",
//                 }}
//               >
//                 <Card
//                   sx={{
//                     backgroundColor: isMine ? "#dcf8c6" : "#f1f0f0",
//                     maxWidth: "75%",
//                   }}
//                 >
//                   <CardContent>
//                     {msg.type === "text" && <Typography>{msg.text}</Typography>}
//                     {msg.type === "audio" && <audio controls src={msg.audio}></audio>}
//                     {msg.type === "file" && (
//                       <Button
//                         href={msg.fileUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         variant="outlined"
//                         startIcon={<UploadFileIcon />}
//                       >
//                         Open File
//                       </Button>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Box>
//             );
//           })}
//         </Stack>
//       </Paper>

//       <Stack direction="row" spacing={1} alignItems="center" mb={2}>
//         <TextField
//           fullWidth
//           label="Type a message"
//           variant="outlined"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <IconButton onClick={sendText} color="primary">
//           <SendIcon />
//         </IconButton>
//       </Stack>

//       <Stack direction="row" spacing={2} alignItems="center">
//         <AudioRecorder onRecordingComplete={sendAudio} />
//         <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
//           Choose File
//           <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
//         </Button>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={uploadFile}
//           disabled={!file}
//         >
//           Upload & Send
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default ChatPage;

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Paper,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AudioRecorder from "./AudioRecorder"; // assumes this exists

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [myId, setMyId] = useState(null);
  const [buddyId, setBuddyId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Step 1: Load user and buddy info and create room
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    console.log(user);
    const uid = user?._id;
    console.log(uid);
    const bid = localStorage.getItem("buddyId");
   console.log(uid)
   console.log(bid);
    if (uid && bid) {
      const room = [uid, bid].sort().join("-");
      console.log(room);
      setMyId(uid);
      setBuddyId(bid);
      setRoomId(room);
    }
  }, []);

  // Step 2: Socket event setup after room is ready
  useEffect(() => {
    // if (!roomId) return;
    if (!roomId || !myId || !buddyId) return;
    socket.emit("joinRoom", { room: roomId });
    console.log("Joining room:", roomId);

    socket.on("loadMessages", (history) => {
      setMessages(history);
      setLoading(false);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("loadMessages");
      socket.off("receiveMessage");
    };
  }, [roomId,myId, buddyId]);

  const sendText = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      room: roomId,
      type: "text",
      text: message,
      sender: myId,
      receiver: buddyId,
    });

    setMessage("");
  };

  const sendAudio = (blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      socket.emit("sendMessage", {
        room: roomId,
        type: "audio",
        audio: reader.result,
        sender: myId,
        receiver: buddyId,
      });
    };
    reader.readAsDataURL(blob);
  };

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    socket.emit("sendMessage", {
      room: roomId,
      type: "file",
      fileUrl: data.fileUrl,
      sender: myId,
      receiver: buddyId,
    });

    setFile(null);
  };
console.log(myId)
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        💬 Chat App
      </Typography>

      <Paper elevation={3} sx={{ height: 400, overflowY: "auto", p: 2, mb: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2}>
            {messages.map((msg, index) => {
              console.log(msg.sender===myId)
             
              const isMine = msg.sender === myId;
               console.log(isMine);
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: isMine ? "flex-end" : "flex-start",
                  }} 
                >
                  <Card
                    sx={{
                      backgroundColor: isMine ? "#dcf8c6" : "#f1f0f0",
                      maxWidth: "75%",
                    }}
                  >
                    <CardContent>
                      {msg.type === "text" && <Typography>{msg.text}</Typography>}
                      {msg.type === "audio" && <audio controls src={msg.audio} />}
                      {msg.type === "file" && (
                        <Button
                          href={msg.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          variant="outlined"
                          startIcon={<UploadFileIcon />}
                        >
                          Open File
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Stack>
        )}
      </Paper>

      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        <TextField
          fullWidth
          label="Type a message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton onClick={sendText} color="primary">
          <SendIcon />
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <AudioRecorder onRecordingComplete={sendAudio} />
        <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
          Choose File
          <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={uploadFile}
          disabled={!file}
        >
          Upload & Send
        </Button>
      </Stack>
    </Box>
  );
};

export default ChatPage;
