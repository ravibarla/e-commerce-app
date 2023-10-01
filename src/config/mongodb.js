import { MongoClient } from "mongodb";

// const url = process.env.DB_URL;
// console.log("db url :", url);

let client;
export const connectToMongodb = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("mongodb is connected");
    })
    .catch((err) => console.log(err));
};

export const getDB = () => {
  return client.db();
};
