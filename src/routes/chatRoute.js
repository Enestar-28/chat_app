import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();

router.get("/messages", chatController.getMessages);
router.post("/message", chatController.sendMessage);

export default router;





