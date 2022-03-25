/**
 *
 * 200 : success
 * 401 : not autenticated
 * 403 : wrong password
 * 406 : invalid paramter
 * 500 : server error
 *
 */

export const generateResponseNotAuthenticated = (res) => {
  return res.status(403).send({ message: "Not Authenticated" });
};

export const generateResponseError = (res) => {
  return res.status(500).send({ message: "Server Error" });
};

export const generateResponseInvalidData = (res) => {
  return res.status(406).send({ message: "Invalid Data" });
};

export const generateFinalResponse = (res, status, responseData) => {
  let returnObj = {
    statusCode: 200,
  };
  if (status) returnObj.statusCode = status;
  if (responseData) returnObj.responseData = responseData;
  return res.status(status).send(returnObj);
};
