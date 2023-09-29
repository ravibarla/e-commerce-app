import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
export default class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const newUser = UserModel.signUp(name, email, password, type);
    res.status(201).send(newUser);
  }
  signIn(req, res) {
    const { email, password } = req.body;
    const result = UserModel.signIn(email, password);

    if (!result) {
      res.status(400).send("Incorrect credentials");
    }
    //1. create jwt token
    const token = jwt.sign(
      { userId: result.id, email: result.email },
      "AkDFFBktLMQ3yEJTHa6JmOQEHKmZyd0p",
      { expiresIn: "1h" }
    );
    //2. send jwt token
    res.status(200).send(token);
  }
}
