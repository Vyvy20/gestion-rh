import { database } from "../database.js";
import sha256 from "js-sha256"

function generateToken(email) {
    return sha256("gestion-rh"+email+ String(new Date().getTime()))
}

const userResolvers = {
    Mutation: {
        connect: async (parent, { email, password }, { user }, info) => {
            // if user connected, delete his token and create an other
            if (user) {
                console.log("User already connected")
                await database("token").where("employe_id", user.id).delete()
            }
            // if not connected, give a new token
            const result = await database.select("password", "id", "role").from("employe").where("email", email)
            // delete already existing token that might have been lost
            // prevent from connecting on multiple device
            await database("token").where("employe_id", result[0].id).delete()
            if (result[0].password === sha256(password)) {
                const token = generateToken(email)
                await database("token").insert({
                    employe_id: result[0].id,
                    token: token
                })
                return { token: token, role: result[0].role, id: result[0].id }
            }
            else {
                return null
            }
        },
        disconnect: async (parent, { email, password }, { user }, info) => {
            // if user connected, return his token
            if (user) {
                await database("token").where("employe_id", user.id).delete();
                

            }
            return "User disconnected";
        }
    }
};

export default userResolvers;
