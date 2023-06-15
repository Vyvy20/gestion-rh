import { database } from "../database.js";

const absencesResolvers = {
    Query: {
        getAbsence: async (parent, { id }, { user }, info) => {
            const absence = await database.select().from("absence").where("id", id)

            if (!user || (user.id != absence[0].employe_id && user.role != "rh")) {
                return null
            }
            return absence[0]
        },
        getAbsences: async (parent, args, { user }, info) => {
            if (!user || user.role != "rh") {
                return null
            }
            return await database.select().from('absence');
        },
        getUserAbsences: async (parent, { userId }, { user }, info) => {
            const absences = await database.select().from("absence").where("employe_id", userId)

            if (!user || (user.id != userId && user.role != "rh")) {
                return null
            }

            return absences
        },
    },
    Mutation: {
        validate: async (parent, { id }, { user }, info) => {
            if (!user || user.role != "rh") {
                throw new Error("User not authorized to perform this action.")
            }
            const absence = await database.select().from("absence").where("id", id)
            await database("absence").where("id", id).update("valide", absence[0].valide ? 0 : 1)
            return "Validation state have been updated successfully"
        },
        addAbsence: async (parent, { employe_id, date_debut, date_fin }, context, info) => {
            if (!user || user.id != employe_id) {
                return null
            }
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