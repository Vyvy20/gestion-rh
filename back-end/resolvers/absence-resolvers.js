import { database } from "../database.js";

const absencesResolvers = {
    Query: {
        getAbsence: async (parent, { id }, context, info) => {
            const absence = await database.select().from("absence").where("id", id)
            return absence[0]
        },
        getAbsences: async (parent, args, context, info) => {
            return await database.select().from('absence');
        }
    },
    Mutation: {
        validate: async (parent, { id }, context, info) => {
            const absence = await database.select().from("absence").where("id", id)
            await database("absence").where("id", id).update("valide", absence[0].valide ? 0 : 1)
            return "Validation state have been updated successfully"
        },
        addAbsence: async (parent, { employe_id, date_debut, date_fin }, context, info) => {
            const absence = {
                "employe_id": employe_id,
                "date_debut": date_debut,
                "date_fin": date_fin,
                "duree": 1 + ((date_fin - date_debut)/86400000)
            }

            await database("absence").insert(absence);
            return "Absence Created"
        }
    }
};

export default absencesResolvers;