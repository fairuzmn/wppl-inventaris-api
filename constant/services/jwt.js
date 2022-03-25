import jwt from "jsonwebtoken";

const SECRET_KEY =
  "c2e47cebae28d2d499a96fc65725b2bc2e580e70a8ac2e8fb6ccfbd61de39c7c86f9332487a58e58d8dbf99f30c0c9a6c81500e977042d90771be893e8ea1252";

export const jwtSignToken = (data) => jwt.sign({ data }, SECRET_KEY);
export const jwtValidateToken = (token) => jwt.verify(token, SECRET_KEY);
