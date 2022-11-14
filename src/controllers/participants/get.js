import { users } from "../../../src/data/mongoDB.js";

export async function getParticipants(req, res) {
    try {
        const usersObj = await users.find().toArray();

        res.send(usersObj);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
