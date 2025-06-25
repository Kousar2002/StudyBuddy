
// import express from 'express';
// const router = express.Router();
// import multer from 'multer';
// import path from 'path';

// // Configure storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // POST /upload
// router.post('/', upload.single('file'), (req, res) => {
//   res.json({ message: 'File uploaded', file: req.file });
// });

// export default router;
// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const router = express.Router();

// // Ensure uploads folder exists
// const uploadFolder = "uploads/audio";
// fs.mkdirSync(uploadFolder, { recursive: true });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadFolder);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });

// router.post("/audio", upload.single("audio"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No audio file uploaded" });
//   }
//   const fileUrl = `/uploads/audio/${req.file.filename}`;
//   res.status(200).json({ fileUrl });
// });

// export default router;

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Upload folder setup
const uploadPath = path.join('uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  res.json({ fileUrl: `http://localhost:3000/uploads/${req.file.filename}` });
});

export default router;

