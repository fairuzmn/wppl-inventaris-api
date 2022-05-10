import mongoose from "mongoose";

export const TransaksiModel = mongoose.model(
  "Transaksi",
  new mongoose.Schema(
    {
      id_barang: String,
      nama: String,
      tanggal_pinjam: Date,
      tanggal_kembali: Date,
      status_pinjam: Number,
    },
    {
      timestamps: true,
    }
  )
);
