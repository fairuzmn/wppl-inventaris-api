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
