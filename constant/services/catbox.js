import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const CATBOX_URI = "https://catbox.moe/user/api.php";
const CATBOX_HASH = "83294425c52ba2bbaba4e0d3c";

export const uploadFile = async (file) => {
  return new Promise(async (resolve) => {
    try {
      let data = new FormData();
      data.append("reqtype", "fileupload");
      data.append("userhash", CATBOX_HASH);
      data.append("fileToUpload", fs.createReadStream(file));

      const config = {
        method: "post",
        url: CATBOX_URI,
        headers: {
          ...data.getHeaders(),
        },
        data: data,
      };

      const uploadRequest = await axios(config);
      resolve(uploadRequest.data ?? null);
    } catch (e) {
      resolve(null);
    }

    fs.unlink(file, (err) => {
      if (err) console.log(err);
    });
  });
};
