import mongoose from "mongoose";
import {
  generateResponseError,
  generateResponseInvalidData,
} from "../helpers/helpers.response.js";

export const MONGODB_URI =
  "mongodb+srv://admin:admin@cluster0.c3xy5.mongodb.net/wppl_inventaris?retryWrites=true&w=majority";

export const validateMongoID = (id) => mongoose.isValidObjectId(id);
export const errorHandlerMongo = (res, error) => {
  if (error.name === "ValidationError") {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return generateResponseInvalidData(res, errors);
  } else {
    return generateResponseError(res);
  }
};

export const validateArrMongoID = (arr) => {
  return new Promise(async (resolve, reject) => {
    if (!Array.isArray(arr) || arr.length == 0) resolve(false);
    let count = 0;
    try {
      for await (const id of arr) {
        if (!mongoose.isValidObjectId(id)) resolve(false);
        count++;
      }
      console.log(`${count} : ${arr.length}`);
      resolve(true);
    } catch (e) {
      resolve(false);
    }
  });
};
