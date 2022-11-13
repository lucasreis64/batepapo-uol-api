import { messages, users } from "../data/mongoDB.js";
import { validation } from "../validation/validation.js";
import { messagesSchema } from "../schemas/messages.js";
import dayjs from "dayjs";

export async function getMessages(req, res) {
    let limit = req.query.limit;
    try {
        const user = req.headers.user;
        let messageArr = await messages.find().toArray();

        if (!user) {
            res.sendStatus(422);
            return;
        }
        
        if (!limit) {
            res.send(messageArr);
            return;
        }

        limit = Number(req.query.limit);

        if (isNaN(limit)) {
            res.status(422);
            return;
        }

        messageArr = filterMessages(messageArr, user, limit);

        res.send(messageArr);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function postMessage(req, res) {
    const from = req.headers.user;
    const messageObj = req.body;
    const { to, text, type } = req.body;

    if (!from) {
        res.status(422).send("missing header field");
        return;
    }

    if (!validation(messageObj, res, messagesSchema)) return;
    try {
        const isExistent = await users.findOne({ name: from });

        if (!isExistent) {
            res.sendStatus(422);
            return;
        }

        let now = dayjs();
        const message = {
            from: from,
            to: to,
            text: text,
            type: type,
            time: now.format("HH:mm:ss"),
        };

        await messages.insertOne(message);

        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

function filterMessages(msg, user, limit) {
    msg = msg.filter(
        ({ from, to, type }) =>
            type === "message" ||
            type === "status" ||
            (type === "private_message" &&
                (from === user ||
                    to === user ||
                    to === "Todos" ||
                    to === "todos"))
    );

    msg = msg.slice(-limit);
    return msg;
}
