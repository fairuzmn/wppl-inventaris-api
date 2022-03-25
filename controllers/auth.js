import { validateArrData } from "../constant/helpers/helpers.global.js";
import {
  generateFinalResponse,
  generateResponseInvalidData,
} from "../constant/helpers/helpers.response.js";
import {
  generatePassword,
  validatePassword,
} from "../constant/services/auth.js";
import { jwtSignToken } from "../constant/services/jwt.js";
import { UserModel } from "../models/User.js";

export const loginHandler = async (req, res) => {
  const { username, password } = req.body;

  if (!validateArrData([username, password])) {
    return generateResponseInvalidData(res);
  }

  const findUser = await UserModel.findOne({ username: username });
  if (!findUser) return res.status(404).send({ message: "User Not Found" });

  const isValid = await validatePassword(password, findUser.password);
  if (!isValid) return res.status(403).send({ message: "Wrong Password" });

  const { _id, name } = findUser;
  const userData = {
    _id: _id.toString(),
    name: name,
    username: username,
  };

  const token = jwtSignToken(userData);
  return generateFinalResponse(res, 200, { userData, token });
};

export const registerHandler = async (req, res) => {
  const { name, username, password } = req.body;

  if (!validateArrData([name, username, password])) {
    return generateResponseInvalidData(res);
  }

  const findUser = await UserModel.findOne({ username: username });
  if (findUser) return res.status(403).send({ message: "User already exist" });

  const passwordHash = await generatePassword(password);

  const newUser = await new UserModel({
    name,
    username,
    password: passwordHash,
  }).save();

  const userData = { _id: newUser._id.toString(), name, username };
  const token = jwtSignToken(userData);

  return generateFinalResponse(res, 200, { userData, token });
};
