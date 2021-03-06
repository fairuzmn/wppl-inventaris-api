import express from "express";
import { loginHandler, registerHandler } from "../controllers/auth.js";

const router = express.Router(express.json());

router.post("/login", loginHandler);
router.post("/register", registerHandler);

export default router;
