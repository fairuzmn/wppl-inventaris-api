import mongoose from "mongoose";

export const CoreBarangModel = mongoose.model(
  "CoreBarang",
  new mongoose.Schema({
    id_vendor: String,
    id_rincian: String,
    nama_barang: String,
    harga: Number,
    img_path: String,
  })
);
