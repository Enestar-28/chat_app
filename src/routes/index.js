import express from "express";
import authRouter from "./authRoute.js";
import userRouter from "./chatRoute.js";



const router = express.Router();

router.get("/api/v0", (req, res) => {
  res.send("Shope web here!");
});

router.use("/api/v0/auth", authRouter);
router.use("/api/v0/user", userRouter);


export default router;
