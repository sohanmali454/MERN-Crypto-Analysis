import express from "express";
import { signIn, signUp, signOut, allUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);
router.get("/allUser", allUser);

export default router;