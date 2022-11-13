import { validation } from "../../../src/validation/validation.js";
import dayjs from "dayjs";
import { participantsSchema } from "../../../src/schemas/participants.js";
import { users, messages } from "../../../src/data/mongoDB.js";

export async function postParticipant(req, res) {
    let now = dayjs();
    const name = req.body.name;

    try {
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

    
        await users.insertOne(userObj);
        await messages.insertOne(messageObj);

        res.status(201).send(userObj);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}