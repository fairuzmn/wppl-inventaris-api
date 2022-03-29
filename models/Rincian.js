import mongoose from "mongoose";

export const RincianModel = mongoose.model(
  "Rincian",
  mongoose.Schema({
    id_rincian: String,
    nama_rincian: String,
  })
);
