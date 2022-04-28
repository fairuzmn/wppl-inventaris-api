import { validateArrData } from "../constant/helpers/helpers.global.js";
import {
  generateFinalResponse,
  generateResponseInvalidData,
  generateResponseInvalidID,
  generateResponseNoChanges,
} from "../constant/helpers/helpers.response.js";
import { uploadFile } from "../constant/services/catbox.js";
import {
  errorHandlerMongo,
  validateMongoID,
} from "../constant/services/mongo.js";
import { CoreBarangModel } from "../models/CoreBarang.js";

export const getCoreBarangs = async (req, res) => {
  const coreBarangs = await CoreBarangModel.find({});
  return generateFinalResponse(res, 200, { coreBarangs });
};

export const getCoreBarang = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const coreBarangs = await CoreBarangModel.findOne({ _id: id });
  return generateFinalResponse(res, 200, { coreBarangs });
};

export const createCoreBarang = async (req, res) => {
  const { nama, harga, vendor, rincian } = req.body;
  const file = req.file;
  let imgUrl = "";

  if (!validateArrData([nama, harga, vendor, rincian])) {
    return generateResponseInvalidData(res);
  }

  if (file) {
    const urlFile = await uploadFile(file.path);
    if (urlFile) imgUrl = urlFile;
  }

  try {
    const newCoreBarang = await new CoreBarangModel({
      nama_barang: nama,
      harga: harga,
      id_vendor: vendor,
      id_rincian: rincian,
      img_path: imgUrl,
    }).save();

    return generateFinalResponse(res, 200, { core_barang: newCoreBarang });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const updateCoreBarang = async (req, res) => {
  const { id } = req.params;
  const { nama, harga, vendor, rincian } = req.body;
  const file = req.file;
  let dataEdit = {
    nama_barang: nama,
    harga: harga,
    id_vendor: vendor,
    id_rincian: rincian,
  };

  if (!validateArrData([id, nama, harga, vendor, rincian])) {
    return generateResponseInvalidData(res);
  }
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  if (file) {
    const urlFile = await uploadFile(file.path);
    if (urlFile) dataEdit = urlFile;
  }

  try {
    const editCoreBarang = await CoreBarangModel.findOneAndUpdate(
      { _id: id },
      dataEdit,
      { returnDocument: "after" }
    );

    if (!editCoreBarang) return generateResponseNoChanges(res);

    return generateFinalResponse(res, 200, { core_barang: editCoreBarang });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const deleteCoreBarang = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const removeCoreBarang = await CoreBarangModel.findByIdAndRemove(
    { _id: id },
    { returnDocument: "after" }
  );

  if (!removeCoreBarang) return generateResponseNoChanges(res);

  return generateFinalResponse(res, 200, { core_barang: removeCoreBarang });
};
