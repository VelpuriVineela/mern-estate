import express from "express";
import { test, updateUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
// token verification and then updation
router.post("/update/:id", verifyToken, updateUser);

export default router;
