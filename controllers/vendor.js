import { validateArrData } from "../constant/helpers/helpers.global.js";
import {
  generateFinalResponse,
  generateResponseInvalidData,
  generateResponseInvalidID,
  generateResponseNoChanges,
} from "../constant/helpers/helpers.response.js";
import { validateMongoID } from "../constant/services/mongo.js";
import { VendorModel } from "../models/Vendor.js";

export const getVendors = async (req, res) => {
  const vendors = await VendorModel.find({});
  return generateFinalResponse(res, 200, { vendors });
};

export const getVendor = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const vendor = await VendorModel.findOne({ _id: id });
  return generateFinalResponse(res, 200, { vendor });
};

export const createVendor = async (req, res) => {
  const { nama } = req.body;

  if (!validateArrData([nama])) return generateResponseInvalidData(res);

  const newVendor = await new VendorModel({
    nama_vendor: nama,
  }).save();

  return generateFinalResponse(res, 200, { vendor: newVendor });
};

export const updateVendor = async (req, res) => {
  const { id } = req.params;
  const { nama } = req.body;

  if (!validateArrData([id, nama])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const editVendor = await VendorModel.findOneAndUpdate(
    { _id: id },
    { nama_vendor: nama },
    { returnDocument: "after" }
  );

  if (!editVendor) return generateResponseNoChanges(res);

  return generateFinalResponse(res, 200, { vendor: editVendor });
};

export const deleteVendor = async (req, res) => {
  const { id } = req.params;

  if (!validateArrData([id])) return generateResponseInvalidData(res);
  if (!validateMongoID(id)) return generateResponseInvalidID(res);

  const removeVendor = await VendorModel.findByIdAndRemove(
    { _id: id },
    { returnDocument: "after" }
  );

  if (!removeVendor) return generateResponseNoChanges(res);

  return generateFinalResponse(res, 200, { vendor: removeVendor });
};
