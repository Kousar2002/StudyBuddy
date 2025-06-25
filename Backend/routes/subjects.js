// const express=require("express");
// const router=express.Router();
// const {getPredefinedSubjects}=require("../controllers/subjectController");
// router.get('/',getPredefinedSubjects);
// module.exports=router;
// routes/subjects.js
import express from "express";
import { getPredefinedSubjects } from "../controllers/subjectController.js";

const router = express.Router();
router.get("/", getPredefinedSubjects);

export default router; // ✅ required for ES Module default import
