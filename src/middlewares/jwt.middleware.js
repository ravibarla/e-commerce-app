import exp from "constants";
import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
  //1.read token
  const token = req.headers["authorization"];

  //2. check if no token return error
  if (!token) {
    return res.status(401).send("Unauthorised");
  }
  //3. check if token is valid
  try {
    const payload = jwt.verify(token, String(process.env.JWT_SECRET));
    req.userId = payload.userId;
    console.log("payload :", payload);
  } catch (error) {
    return res.status(401).send("Unauthorised");
  }
  //4. call next middleware else return error
  next();
};

export default jwtAuth;
