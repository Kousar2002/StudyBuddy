// const express=require("express");
// const router=express.Router();
// const {registerUser,loginUser}=require("../controllers/authController");
// router.post("/register",registerUser);
// router.post("/login",loginUser);
// // module.exports=router;
// export default router;
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
