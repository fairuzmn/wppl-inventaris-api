import mongoose from "mongoose";

export const BarangModel = mongoose.model(
  "Barang",
  new mongoose.Schema({
    id_barang: String,
    keterangan: String,
  })
);
