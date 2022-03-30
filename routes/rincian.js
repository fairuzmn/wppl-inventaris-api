import express from "express";
import { authHandler } from "../constant/services/auth.js";
import {
  createRincian,
  deleteRincian,
  updateRincian,
  getRincians,
  getRincian
} from "../controllers/rincian.js";

const router = express.Router(express.json());
router.use(authHandler);

router.get("/", getRincians);
router.get("/:id", getRincian);
router.post("/", createRincian);
router.put("/:id", updateRincian);
router.delete("/:id", deleteRincian);

export default router;
