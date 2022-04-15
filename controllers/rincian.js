import { validateArrData } from "../constant/helpers/helpers.global.js";
import {
  generateFinalResponse,
  generateResponseInvalidData,
  generateResponseInvalidID,
  generateResponseNoChanges,
} from "../constant/helpers/helpers.response.js";
import { validateMongoID } from "../constant/services/mongo.js";
import { RincianModel } from "../models/Rincian.js";

export const getRincians = async (req, res) => {
  const rincians = await RincianModel.find({});
  return generateFinalResponse(res, 200, { rincians });
};

export const getRincian = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const rincian = await RincianModel.findOne({ _id: id });
  return generateFinalResponse(res, 200, { rincian });
};

export const createRincian = async (req, res) => {
  const { nama } = req.body;

  if (!validateArrData([nama])) return generateResponseInvalidData(res);

  try {
    const newRincian = await new RincianModel({
      nama_rincian: nama,
    }).save();

    return generateFinalResponse(res, 200, { rincian: newRincian });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const updateRincian = async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;

  if (!validateArrData([id, nama])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  try {
    const editRincian = await RincianModel.findOneAndUpdate(
      { _id: id },
      { nama_rincian: nama },
      { returnDocument: "after" }
    );

    if (!editRincian) return generateResponseNoChanges(res);

    return generateFinalResponse(res, 200, { rincian: editRincian });
  } catch (e) {
    return errorHandlerMongo(res, e);
  }
};

export const deleteRincian = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const removeRincian = await RincianModel.findByIdAndRemove(
    { _id: id },
    { returnDocument: "after" }
  );

  if (!removeRincian) return generateResponseNoChanges(res);

  return generateFinalResponse(res, 200, { rincian: removeRincian });
};
