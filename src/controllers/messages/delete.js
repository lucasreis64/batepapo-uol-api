import { ObjectId } from "mongodb";
import { messages } from "../../data/mongoDB.js";

export async function deleteMessage(req, res) {
    const user = req.headers.user;
    const id = req.params.id;

    if (!user || !id) {
        res.sendStatus(422);
        return;
    }

    try {
        const message = await messages.findOne({ _id: ObjectId(id) });
        console.log(message);
        if (!message) {
            res.sendStatus(404);
            return;
        }

        if (user !== message.from) {
            res.sendStatus(401);
            return;
        }

        await messages.deleteOne({ _id: ObjectId(id) });
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
