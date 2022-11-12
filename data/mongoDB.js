import dotenv from 'dotenv'
import {MongoClient} from 'mongodb'

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI)
await mongoClient.connect()

export const db = mongoClient.db("batepapo-uol-api")
export const users = db.collection("participants")
export const messages = db.collection("messages")