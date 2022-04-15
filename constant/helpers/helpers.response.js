/**
 *
 * 200 : success
 * 401 : not autenticated
 * 403 : wrong password
 * 404 : no doc available
 * 406 : invalid parameter
 * 500 : server error
 *
 */

export const generateResponseNotAuthenticated = (res) => {
  return res.status(403).send({ message: "Not Authenticated" });
};

export const generateResponseError = (res) => {
  return res.status(500).send({ message: "Server Error" });
};

export const generateResponseInvalidData = (res, errors) => {
  let _res = { message: "Invalid Data" };
  if (errors) _res.errors = errors;
  return res.status(406).send(_res);
};

export const generateResponseInvalidID = (res) => {
  return res.status(406).send({ message: "Invalid ID" });
};

export const generateResponseNoChanges = (res) => {
  res.status(404).send({ message: "No document to changes" });
};

export const generateFinalResponse = (res, status, responseData) => {
  let returnObj = {
    statusCode: 200,
  };
  if (status) returnObj.statusCode = status;
  if (responseData) returnObj.responseData = responseData;
  return res.status(status).send(returnObj);
};
