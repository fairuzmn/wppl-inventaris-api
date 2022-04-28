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
import { RuanganModel } from "../models/Ruangan.js";

export const getRuangans = async (req, res) => {
  const ruangans = await RuanganModel.find({});
  return generateFinalResponse(res, 200, { ruangans });
};

export const getRuangan = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const ruangan = await RuanganModel.findOne({ _id: id });
  return generateFinalResponse(res, 200, { ruangan });
};

export const createRuangan = async (req, res) => {
  const { nama, keterangan } = req.body;
  const file = req.file;
  let imgUrl = "";

  if (!validateArrData([nama, keterangan])) {
    return generateResponseInvalidData(res);
  }

  if (file) {
    const urlFile = await uploadFile(file.path);
    if (urlFile) imgUrl = urlFile;
  }

  try {
    const newRuangan = await new RuanganModel({
      nama,
      keterangan,
      img_path: imgUrl,
    }).save();

    return generateFinalResponse(res, 200, { ruangan: newRuangan });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const updateRuangan = async (req, res) => {
  const { id } = req.params;
  const { nama, keterangan } = req.body;
  const file = req.file;

  if (!validateArrData([id, nama, keterangan])) {
    return generateResponseInvalidData(res);
  }
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  let dataEdit = { nama, keterangan };
  if (file) {
    const urlFile = await uploadFile(file.path);
    if (urlFile) dataEdit.img_path = urlFile;
  }

  try {
    const editRuangan = await RuanganModel.findOneAndUpdate(
      { _id: id },
      dataEdit,
      { returnDocument: "after" }
    );

    if (!editRuangan) return generateResponseNoChanges(res);

    return generateFinalResponse(res, 200, { ruangan: editRuangan });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const deleteRuangan = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const removeRuangan = await RuanganModel.findByIdAndRemove(
    { _id: id },
    { returnDocument: "after" }
  );

  if (!removeRuangan) return generateResponseNoChanges(res);

  return generateFinalResponse(res, 200, { ruangan: removeRuangan });
};
