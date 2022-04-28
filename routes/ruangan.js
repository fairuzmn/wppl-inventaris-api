import express from "express";
import { multerUpload } from "../constant/middlewares/multer.js";
import { authHandler } from "../constant/services/auth.js";
import {
  createRuangan,
  deleteRuangan,
  getRuangan,
  getRuangans,
  updateRuangan,
} from "../controllers/ruangan.js";

const router = express.Router(express.json());
router.use(authHandler);

router.get("/", getRuangans);
router.get("/:id", getRuangan);
router.post("/", multerUpload.single("img"), createRuangan);
router.put("/:id", multerUpload.single("img"), updateRuangan);
router.delete("/:id", deleteRuangan);

export default router;
