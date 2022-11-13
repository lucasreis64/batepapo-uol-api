import { users } from "../../data/mongoDB.js";


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