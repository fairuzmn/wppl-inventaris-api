import mongoose from "mongoose";

export const CoreBarangModel = mongoose.model(
  "CoreBarang",
  mongoose.Schema({
    id_barang: String,
    id_vendor: String,
    id_rincian: String,
    nama_barang: String,
    harga: Number,
  })
);
