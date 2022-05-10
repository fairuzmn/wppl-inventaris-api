import { validateArrData } from "../constant/helpers/helpers.global.js";
import {
  generateFinalResponse,
  generateResponseInvalidData,
  generateResponseInvalidID,
  generateResponseNoChanges,
} from "../constant/helpers/helpers.response.js";
import { validateMongoID } from "../constant/services/mongo.js";
import { TransaksiModel } from "../models/Transaksi.js";

export const getTransaksis = async (req, res) => {
  const transaksis = await TransaksiModel.find({});
  return generateFinalResponse(res, 200, { transaksis });
};

export const getTransaksi = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const transaksi = await TransaksiModel.findOne({ _id: id });
  return generateFinalResponse(res, 200, { transaksi });
};

export const createTransaksi = async (req, res) => {
  const { id_barang, nama, tanggal_pinjam, tanggal_kembali } = req.body;

  if (!validateArrData([id_barang, nama, tanggal_pinjam, tanggal_kembali])) {
    return generateResponseInvalidData(res);
  }

  try {
    const newTransaksi = await new TransaksiModel({
      id_barang,
      nama,
      tanggal_pinjam,
      tanggal_kembali,
      status_pinjam: 1,
    }).save();

    return generateFinalResponse(res, 200, { transaksi: newTransaksi });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const updateTransaksi = async (req, res) => {
  const { id } = req.params;
  const { nama, tanggal_pinjam, tanggal_kembali, status_pinjam } = req.body;

  if (!validateArrData([nama, tanggal_pinjam, tanggal_kembali, status_pinjam]))
    return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  try {
    const editTransaksi = await TransaksiModel.findOneAndUpdate(
      { _id: id },
      { nama, tanggal_pinjam, tanggal_kembali, status_pinjam },
      { returnDocument: "after" }
    );

    if (!editTransaksi) return generateResponseNoChanges(res);

    return generateFinalResponse(res, 200, { transaksi: editTransaksi });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const deleteTransaksi = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const removeTransaksi = await TransaksiModel.findByIdAndRemove(
    { _id: id },
    { returnDocument: "after" }
  );

  if (!removeTransaksi) return generateResponseNoChanges(res);

  return generateFinalResponse(res, 200, { transaksi: removeTransaksi });
};
