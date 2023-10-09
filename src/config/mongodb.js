import { MongoClient } from "mongodb";

// const url = process.env.DB_URL;
// console.log("db url :", url);

let client;
export const connectToMongodb = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("mongodb is connected");
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) => console.log(err));
};

export const getClient = () => {
  return client;
};

export const getDB = () => {
  return client.db();
};

export const createCounter = async (db) => {
  const existingCounter = await db.collection("counters").findOne({
    _id: "cartItemId",
  });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

export const createIndexes = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });
    await db.collection("products").createIndex({ name: 1, category: -1 });

    await db.collection("products").createIndex({ desc: "text" });
    console.log("index is created  ");
  } catch (err) {
    console.log(err);
  }
};
