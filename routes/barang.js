import express from "express";
import { authHandler } from "../constant/services/auth.js";
import {
  createBarang,
  deleteBarang,
  getBarang,
  getBarangs,
  updateBarang,
} from "../controllers/barang.js";

const router = express.Router(express.json());
router.use(authHandler);

router.get("/", getBarangs);
router.get("/:id", getBarang);
router.post("/", createBarang);
router.put("/:id", updateBarang);
router.delete("/:id", deleteBarang);

export default router;
