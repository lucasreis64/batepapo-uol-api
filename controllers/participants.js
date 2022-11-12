import { db } from "../data/mongoDB.js"
import {validateParticipant} from "../validation/validation.js"
import dayjs from 'dayjs'

const users = db.collection("participants")
const messages = db.collection("messages")

export async function getParticipants (req, res) {
    try{
        const usersObj = await users.find().toArray()
        const usersArr = usersObj.map((u)=>u.name)
        
        res.send(usersArr)
    }catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

export async function postParticipant (req, res) {
    let now = dayjs()
    const name = req.body.name
    
    if (!validateParticipant(req.body, res)) return

    const messageObj = {from: name, to: 'Todos', text: 'entra na sala...', type: 'status', time: now.format("HH:mm:ss")}
    const userObj = {name: name, lastStatus:Date.now()}

    try{
        const user = await users.insertOne(userObj)
        const message = messages.insertOne(messageObj)
        
        res.send(userObj)
    }catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}
