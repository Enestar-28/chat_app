import { addMessage, getMessages } from "../controllers/messageController"



const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

export default router;
