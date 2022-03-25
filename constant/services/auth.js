import bcrypt from "bcrypt";
import { generateResponseNotAuthenticated } from "../helpers/helpers.response.js";
import { jwtValidateToken } from "./jwt.js";

export const generatePassword = (password) => {
  return new Promise(async (resolve) => {
    const result = await bcrypt.hash(password, 10);
    resolve(result);
  });
};

export const validatePassword = (param, db) => {
  return new Promise(async (resolve) => {
    const result = await bcrypt.compare(param, db);
    resolve(result);
  });
};

export const authHandler = (req, res, next) => {
  const token = req.headers["x-auth"];

  try {
    const verify = jwtValidateToken(token);
    req.userData = verify;
    next();
  } catch (e) {
    return generateResponseNotAuthenticated(res);
  }
};
