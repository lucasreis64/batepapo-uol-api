import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
} catch (err) {
    console.log(err);
}

export const db = mongoClient.db("batepapo-uol-api");
export const users = db.collection("participants");
export const messages = db.collection("messages");
