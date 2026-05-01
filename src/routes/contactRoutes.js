import express from "express";
const router = express.Router();

import contactController from "../controllers/contactController.js";

//Contact routes
router.post("/contact", contactController.addContact);
router.get("/contact", contactController.getContact);
export default router;
