import mongoose from "mongoose";

export const RuanganModel = mongoose.model(
  "Ruangan",
  new mongoose.Schema(
    {
      nama: String,
      keterangan: String,
      img_path: String,
    },
    {
      timestamps: true,
    }
  )
);
