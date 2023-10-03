import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/application.error.js";

export class UserModel {
  constructor(name, email, password, type, id) {
    (this._id = id),
      (this.name = name),
      (this.email = email),
      (this.type = type),
      (this.password = password);
  }
  static async signUp(name, email, password, type) {
    try {
      //1. get the database
      const db = getDB();
      //2. get the collections
      const collection = db.collection("users");

      const newUser = new UserModel(name, email, password, type);
      //3. insert a document
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      throw new ApplicationError("something went wrong", 500);
    }
  }

  static getAllUsers() {
    return users;
  }
}
let users = [
  {
    id: 1,
    name: "Seller User",
    email: "selleruser@gmail.com",
    password: "1234",
    type: "seller",
  },
];
