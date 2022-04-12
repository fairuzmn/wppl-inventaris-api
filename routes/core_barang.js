import express from "express";
import { authHandler } from "../constant/services/auth.js";
import {
  createCoreBarang,
  deleteCoreBarang,
  getCoreBarang,
  getCoreBarangs,
  updateCoreBarang,
} from "../controllers/core_barang.js";

const router = express.Router(express.json());
router.use(authHandler);

router.get("/", getCoreBarangs);
router.get("/:id", getCoreBarang);
router.post("/", createCoreBarang);
router.put("/:id", updateCoreBarang);
router.delete("/:id", deleteCoreBarang);

export default router;
