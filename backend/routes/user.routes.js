
import express from "express";
import { bulkCreateUsers, bulkUpdateUsers, deviceStats, getUsers, searchUsers, updateWallet } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/bulk-create", bulkCreateUsers);

userRouter.post("/bulk-update", bulkUpdateUsers);

userRouter.get("/", getUsers);

userRouter.get("/search", searchUsers);

userRouter.patch("/:id/wallet", updateWallet);

userRouter.get("/device-stats", deviceStats);

export default userRouter;