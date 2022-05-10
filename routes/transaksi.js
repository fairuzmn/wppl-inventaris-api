import express from "express";
import { authHandler } from "../constant/services/auth.js";
import {
  createTransaksi,
  deleteTransaksi,
  getTransaksi,
  getTransaksis,
  updateTransaksi,
} from "../controllers/transaksi.js";

const router = express.Router(express.json());
router.use(authHandler);

router.get("/", getTransaksis);
router.get("/:id", getTransaksi);
router.post("/", createTransaksi);
router.put("/:id", updateTransaksi);
router.delete("/:id", deleteTransaksi);

export default router;
