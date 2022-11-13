import { users, messages } from "../data/mongoDB.js";
import { validation } from "../validation/validation.js";
import dayjs from "dayjs";
import { participantsSchema } from "../schemas/participants.js";

export async function getParticipants(req, res) {
    try {
        const usersObj = await users.find().toArray();
        const usersArr = usersObj.map((u) => u.name);

        res.send(usersArr);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function postParticipant(req, res) {
    let now = dayjs();
    const name = req.body.name;
    const isSameName = await users.findOne({ name: name });

    if (!validation(req.body, res, participantsSchema)) return;

    if (isSameName) {
        res.status(422).send(`username "${name}" is already in use`);
        return
    }

    const messageObj = {
        from: name,
        to: "Todos",
        text: "entra na sala...",
        type: "status",
        time: now.format("HH:mm:ss"),
    };
    const userObj = { name: name, lastStatus: Date.now() };

    try {
        await users.insertOne(userObj);
        await messages.insertOne(messageObj);

        res.status(201).send(userObj);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

function existentUser(user, response, same) {
    if (same) {
        response.status(422).send(`username "${user}" is already in use`);
        return true;
    }

    return false;
}
