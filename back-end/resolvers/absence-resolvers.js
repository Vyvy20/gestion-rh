import { database } from "../connection.js";

const absencesResolvers = {
    Query: {
        getAbsence: async (parent, { id }, context, info) => {
            const absence = await database.select().from("absence").where("id", id)
            console.log(absence)
            return absence[0]
        }
    },
};

export default absencesResolvers;