import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGODB_URI } from "./constant/services/mongo.js";
import AuthRoute from "./routes/auth.js";
import RincianRoute from "./routes/rincian.js";
import VendorRoute from "./routes/vendor.js";
import CoreBarangRoute from "./routes/core_barang.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRoute);
app.use("/rincian", RincianRoute);
app.use("/vendor", VendorRoute);
app.use("/core-barang", CoreBarangRoute);

app.get("/", (req, res) => {
  res.send("it work");
});

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(port, function () {
      console.log(`Listening to Port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
