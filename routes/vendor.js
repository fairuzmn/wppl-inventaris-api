import express from "express";
import { authHandler } from "../constant/services/auth.js";
import {
  createVendor,
  deleteVendor,
  getVendor,
  getVendors,
  updateVendor,
} from "../controllers/vendor.js";

const router = express.Router(express.json());
router.use(authHandler);

router.get("/", getVendors);
router.get("/:id", getVendor);
router.post("/", createVendor);
router.put("/:id", updateVendor);
router.delete("/:id", deleteVendor);

export default router;
