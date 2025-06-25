// const express=require("express");
// const router=express.Router();
// // const Profile=require("../models/Profile");
// const {protect}=require("../middleware/authMiddleware");
// const {createOrUpdateProfile,getMatches,getMyProfile}=require("../controllers/profileController");
// router.post("/profile",protect,createOrUpdateProfile);
// router.get("/match", protect, getMatches);
// router.get("/me", protect, getMyProfile);
// module.exports=router;
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrUpdateProfile, getMatches, getMyProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post("/profile", protect, createOrUpdateProfile);
router.get("/match", protect, getMatches);
router.get("/me", protect, getMyProfile);

export default router;
