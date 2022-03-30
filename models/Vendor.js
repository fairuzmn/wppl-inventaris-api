import mongoose from "mongoose";

export const VendorModel = mongoose.model(
  "Vendor",
  new mongoose.Schema({
    nama_vendor: String,
  })
);
