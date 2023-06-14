import { database } from "./database.js";

export default async function getUser(token) {
    const user_id = await database.select("employe_id").from("token").where("token", token);
    if(user_id.length === 0) {
        return null
    }
    const result = await database.select().from("employe").where("id", user_id[0].employe_id)
    return result[0]
}
