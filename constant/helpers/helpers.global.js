import crypto from "crypto";

export const validateArrData = (arr) => {
  let flag = true;
  arr.forEach((item) => {
    if (item === undefined) flag = false;
  });
  return flag;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const randomString = (length = 10) => {
  return crypto.randomBytes(length).toString("hex");
};
