import dayjs from "dayjs";
import { users, messages } from "../data/mongoDB.js";

export async function removeInactive() {
    try {
        const maxTime = 10000;
        const usersArr = await users.find().toArray();
        const deleteArr = usersArr.filter(
            ({ lastStatus }) => Date.now() - lastStatus > maxTime
        );

        deleteArr.forEach(async (d) => {
            let now = dayjs();
            const id = d._id;
            await users.deleteOne({ _id: id });
            await messages.insertOne({
                from: d.name,
                to: "Todos",
                text: "sai da sala...",
                type: "status",
                time: now.format("HH:mm:ss"),
            });
        });
    } catch (error) {
        console.error(error);
    }
}
