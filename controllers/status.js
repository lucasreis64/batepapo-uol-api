import { users } from "../data/mongoDB";

export async function postStatus (req, res) {
    const user = req.headers.user
    try{
        const isExistent = await users.findOne(user)
    } catch{}
    


}