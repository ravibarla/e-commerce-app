import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = new UserModel(name, email, password, type);
    await this.userRepository.signUp(user);
    res.status(201).send(user);
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.userRepository.signIn(email, password);

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
    } catch (err) {
      console.log(err);
      res.status(200).send("something went wrong ");
    }
  }
}
