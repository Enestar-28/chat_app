import express from "express";
import authRouter from "./authRoute.js";
// import chatRouter from "./chatRoute.js";

const router = express.Router();

router.get("/api", (req, res) => {
  res.send("Shope web here!");
});

router.use("/api/auth", authRouter);
// router.use("/api/user", chatRouter);

export default router;
