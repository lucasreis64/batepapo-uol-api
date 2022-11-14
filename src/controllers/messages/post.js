import { messages, users } from "../../../src/data/mongoDB.js";
import { validation } from "../../validation/validation.js";
import { messagesSchema } from "../../../src/schemas/messages.js";
import dayjs from "dayjs";
import { sanitization } from "../../sanitization/sanitization.js";

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

        sanitization(message, false);

        await messages.insertOne(message);

        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
