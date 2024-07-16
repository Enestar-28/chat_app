import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/info/:id", authController.getUsers);
router.get("/logout/:id", authController.logOut);

export default router;
