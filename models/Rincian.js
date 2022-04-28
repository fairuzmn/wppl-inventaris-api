import mongoose from "mongoose";

export const RincianModel = mongoose.model(
  "Rincian",
  new mongoose.Schema(
    {
      nama_rincian: String,
    },
    {
      timestamps: true,
    }
  )
);
