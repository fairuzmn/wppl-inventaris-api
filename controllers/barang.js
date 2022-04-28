import { validateArrData } from "../constant/helpers/helpers.global.js";
import {
  generateFinalResponse,
  generateResponseInvalidData,
  generateResponseInvalidID,
  generateResponseNoChanges,
} from "../constant/helpers/helpers.response.js";
import { validateMongoID } from "../constant/services/mongo.js";
import { BarangModel } from "../models/Barang.js";

export const getBarangs = async (req, res) => {
  const barangs = await BarangModel.find({});
  return generateFinalResponse(res, 200, { barangs });
};

export const getBarang = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const barang = await BarangModel.findOne({ _id: id });
  return generateFinalResponse(res, 200, { barang });
};

export const createBarang = async (req, res) => {
  const { id_barang, keterangan, id_ruangan } = req.body;

  if (!validateArrData([id_barang, keterangan])) {
    return generateResponseInvalidData(res);
  }

  try {
    const newBarang = await new BarangModel({
      id_barang,
      keterangan,
      id_ruangan: id_ruangan ?? null,
    }).save();

    return generateFinalResponse(res, 200, { barang: newBarang });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const updateBarang = async (req, res) => {
  const { id } = req.params;
  const { id_barang, keterangan, id_ruangan } = req.body;

  if (!validateArrData([id, id_barang, keterangan, id_ruangan])) {
    return generateResponseInvalidData(res);
  }
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  try {
    const editBarang = await BarangModel.findOneAndUpdate(
      { _id: id },
      { id_barang, keterangan, id_ruangan: id_ruangan ?? null },
      { returnDocument: "after" }
    );

    if (!editBarang) return generateResponseNoChanges(res);

    return generateFinalResponse(res, 200, { barang: editBarang });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const deleteBarang = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const removeBarang = await BarangModel.findByIdAndRemove(
    { _id: id },
    { returnDocument: "after" }
  );

  if (!removeBarang) return generateResponseNoChanges(res);

  return generateFinalResponse(res, 200, { barang: removeBarang });
};
