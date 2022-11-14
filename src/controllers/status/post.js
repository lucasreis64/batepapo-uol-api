import { users } from "../../../src/data/mongoDB.js";

export async function postStatus (req, res) {
    const user = req.headers.user
    try{
        const isExistent = await users.findOne({name: user})

        if(!isExistent) {
            res.sendStatus(404)
            return
        }

        const id = isExistent._id
        
        await users.updateOne({_id: id}, {$set: {lastStatus: Date.now()}})
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}