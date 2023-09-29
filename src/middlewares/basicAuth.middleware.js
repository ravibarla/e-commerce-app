import exp from "constants";
import { UserModel } from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  //1. check if authorizer header is empty
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("no authorisation found");
  }
  //2. extract credentials  [Basic qwryeywihewbn]
  console.log("header :", authHeader);
  const base6Credentials = authHeader.replace("Basic", "");
  console.log("base6Credentials :", base6Credentials);

  //3. decode credentials
  const decodedCreds = Buffer.from(base6Credentials, "base64").toString(
    "utf-8"
  );
  console.log("decodedCreds :", decodedCreds);
  const creds = decodedCreds.split(":");
  console.log("creds :", creds);
  const user = UserModel.getAllUsers().find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );
  if (user) {
    next();
  } else {
    res.status(401).send("incorrect credentials");
  }
};

export default basicAuthorizer;
