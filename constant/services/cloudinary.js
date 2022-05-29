import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = "wpplinventaris";
const API_KEY = "247358167485946";
const API_SECRET = "a252UfP-67P2N68zbYa3JbaGCQY";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const uploadFile = async (file) => {
  return new Promise(async (resolve) => {
    try {
      let buff = fs.readFileSync(file);
      let base64data = buff.toString("base64");
      const content = "data:image/jpeg;base64," + base64data;
      cloudinary.uploader.upload(content, (err, res) => {
        if (err) resolve(null);
        resolve(res.secure_url);
      });
    } catch (e) {
      resolve(null);
    }

    fs.unlink(file, (err) => {
      if (err) console.log(err);
    });
  });
};
