import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/ecomdb";

let client;
export const connectToMongodb = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("mongodb is connected");
    })
    .catch((err) => console.log(err));
};

export const getDB = () => {
  return client.db();
};
