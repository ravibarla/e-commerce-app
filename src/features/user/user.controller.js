import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
// import UserRepository from "./user.repository_old.js";

import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res, next) {
    try {
      const { name, email, password, type } = req.body;
      // const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel(name, email, password, type);
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (err) {
      // console.log(err);
      // res.status(200).send("something went wrong in database");
      next(err);
    }
    next();
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        res.status(400).send("Incorrect credentials");
      } else {
        //compare password with hashed password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          //1. create jwt token
          const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          console.log("token :", token);
          //2. send jwt token
          res.status(200).send(token);
        } else {
          res.status(400).send("Incorrect credentials");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(200).send("something went wrong ");
    }
  }

  async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const userId = req.userId;

    try {
      await this.userRepository.resetPassword(userId, hashedPassword);
      res.status(200).send("password is updated successfully");
    } catch (err) {
      console.log(err);
      console.log("something went wrong with database");
      next();
    }
  }
}
