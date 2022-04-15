import multer from "multer";
import { randomString } from "../helpers/helpers.global.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const exts = file.mimetype.split("/");
    const ext = exts[exts.length - 1];
    cb(null, `${randomString(10)}.${ext}`);
  },
});

export const multerUpload = multer({ storage: storage });
