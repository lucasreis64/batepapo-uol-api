import { db } from "../data/mongoDB.js"
import {validation} from "../validation/validation.js"
import dayjs from 'dayjs'
import { participantsSchema } from "../schemas/participants.js";

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
    
    if (!validation(req.body, res, participantsSchema)) return

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
