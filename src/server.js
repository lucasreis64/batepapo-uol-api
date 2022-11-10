import express, {json} from 'express'
import cors from 'cors'
import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import dayjs from "dayjs"

dotenv.config();

let now = dayjs()
const app = express()
app.use(cors())
app.use(json())
console.log(now.format("HH:mm:ss"));
const mongoClient = new MongoClient(process.env.MONGO_URI)

await mongoClient.connect()
const db = mongoClient.db("batepapo-uol-api")
const users = db.collection("participants")
const messages = db.collection("messages")


app.post('/participants', async (req, res) =>{
    const messageObj = {from: req.body.name, to: 'Todos', text: 'entra na sala...', type: 'status', time: now.format("HH:mm:ss")}
    const userObj = {name: req.body.name, lastStatus:Date.now()}
    try{
        const user = await users.insertOne(userObj)
        const message = messages.insertOne(messageObj)
        res.send(userObj)
    }catch (error) {
        console.log(error)
    }
})

app.get('/participants', async (req, res) => {
    try{
        const usersObj = await users.find().toArray()
        const usersArr = usersObj.map((u)=>u.name)
        res.send(usersArr)
    }catch (error) {
        console.log(error)
    }
})




app.listen(5000, ()=>{
    console.log('Rodando!')
})