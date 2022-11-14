import { ObjectId } from "mongodb";
import { messages, users } from "../../data/mongoDB.js";
import { messagesSchema } from "../../schemas/messages.js";
import { validation } from "../../validation/validation.js";

export async function messagePut(req, res) {
    const user = req.headers.user;
    const id = req.params.id;
    const messageObj = req.body;

    if (!user) {
        res.status(422).send("missing header field");
        return;
    }

    if (!validation(messageObj, res, messagesSchema)) return;
    try {
        const isExistent = await users.findOne({ name: user });

        if (!isExistent) {
            res.status(422).send('user not found');
            return;
        }

        const message = await messages.findOne({ _id: ObjectId(id) });

        if (!message) {
            res.sendStatus(404);
            return;
        }

        if (message.from !== user) {
            res.sendStatus(401);
            return;
        }

        messageObj.from = user;
        const { to, text, type, from } = messageObj;

        await messages.updateOne(
            { _id: ObjectId(id) },
            { $set: { to: to, text: text, type: type, from: from } }
        );

        res.status(201).send(message);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
