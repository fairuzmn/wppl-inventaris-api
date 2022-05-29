import { validateArrData } from "../constant/helpers/helpers.global.js";
import {
  generateFinalResponse,
  generateResponseInvalidData,
  generateResponseInvalidID,
  generateResponseNoChanges,
} from "../constant/helpers/helpers.response.js";
import { uploadFile } from "../constant/services/cloudinary.js";
import {
  errorHandlerMongo,
  validateArrMongoID,
  validateMongoID,
} from "../constant/services/mongo.js";
import { CoreBarangModel } from "../models/CoreBarang.js";
import { RincianModel } from "../models/Rincian.js";

export const getCoreBarangs = async (req, res) => {
  const coreBarangs = await CoreBarangModel.find({});
  let arrResult = [];
  if (coreBarangs.length > 0) {
    for await (const coreBarang of coreBarangs) {
      const validate = await validateArrMongoID(coreBarang.id_rincian);
      if (validate) {
        const findRincian = await RincianModel.find({
          _id: { $in: coreBarang.id_rincian },
        });
        arrResult.push({ ...coreBarang["_doc"], rincians: findRincian });
      } else {
        arrResult.push({ ...coreBarang["_doc"], rincians: [] });
      }
    }
  }
  return generateFinalResponse(res, 200, { coreBarangs: arrResult });
};

export const getCoreBarang = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);
  let rincians = [];

  let coreBarangs = await CoreBarangModel.findOne({ _id: id });
  const validate = await validateArrMongoID(coreBarangs.id_rincian);
  if (validate) {
    const id_rincian = coreBarangs.id_rincian;
    const findRincian = await RincianModel.find({
      _id: { $in: id_rincian },
    });
    rincians = findRincian;
  }
  return generateFinalResponse(res, 200, {
    coreBarang: { ...coreBarangs["_doc"], rincians },
  });
};

export const createCoreBarang = async (req, res) => {
  const { nama, harga, vendor, rincians } = req.body;
  const file = req.file;
  let imgUrl = "";

  if (!validateArrData([nama, harga, vendor, rincians])) {
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
      id_rincian: rincians,
      img_path: imgUrl,
    }).save();

    return generateFinalResponse(res, 200, { core_barang: newCoreBarang });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const updateCoreBarang = async (req, res) => {
  const { id } = req.params;
  const { nama, harga, vendor, rincians } = req.body;
  const file = req.file;
  let dataEdit = {
    nama_barang: nama,
    harga: harga,
    id_vendor: vendor,
    id_rincian: rincians,
  };

  if (!validateArrData([id, nama, harga, vendor, rincians])) {
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
