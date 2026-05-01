import express from "express";
const router = express.Router();

import authController from "../controllers/authController.js";
//Routes
router.get("/google", authController.googleLogin);
export default router;
