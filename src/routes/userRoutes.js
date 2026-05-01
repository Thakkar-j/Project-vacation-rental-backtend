import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";

//User routes
router.get("/users", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.addUser);
router.delete("/user/:email", userController.deleteUser);
router.put("/user/:id", userController.updateUser);
router.get("/search", userController.searchUser);
export default router;
