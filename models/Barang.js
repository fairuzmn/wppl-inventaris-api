import mongoose from "mongoose";

export const BarangModel = mongoose.model(
  "Barang",
  mongoose.Schema({
    id_barang: String,
    id_detail_barang: String,
    keterangan: String,
  })
);
