import { messages } from "../../src/validation/data/mongoDB.js";
import filterMessages from "./functions/filterMessages.js";


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
