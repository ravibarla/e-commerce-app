import { ApplicationError } from "../../error-handler/application.error.js";
import { getDB } from "../../config/mongodb.js";
export default class UserRepository {
  async signUp(newUser) {
    try {
      //1. get the database
      const db = getDB();
      //2. get the collections
      const collection = db.collection("users");

      //3. insert a document
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }
  async findByEmail(email) {
    try {
      //1. get the database
      const db = getDB();
      //2. get the collections
      const collection = db.collection("users");

      //3. find a document
      return await collection.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }

  async signIn(email, password) {
    try {
      //1. get the database
      const db = getDB();
      //2. get the collections
      const collection = db.collection("users");

      //3. find a document
      return await collection.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("something went wrong with database", 500);
    }
  }
}
