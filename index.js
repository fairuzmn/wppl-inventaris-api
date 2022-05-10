import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { MONGODB_URI } from "./constant/services/mongo.js";
import AuthRoute from "./routes/auth.js";
import RincianRoute from "./routes/rincian.js";
import VendorRoute from "./routes/vendor.js";
import CoreBarangRoute from "./routes/core_barang.js";
import BarangRoute from "./routes/barang.js";
import RuanganRoute from "./routes/ruangan.js";
import TransaksiRoute from "./routes/transaksi.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRoute);
app.use("/rincian", RincianRoute);
app.use("/vendor", VendorRoute);
app.use("/core-barang", CoreBarangRoute);
app.use("/barang", BarangRoute);
app.use("/ruangan", RuanganRoute);
app.use("/transaksi", TransaksiRoute);

app.use((_, res) => res.sendStatus(404));

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
