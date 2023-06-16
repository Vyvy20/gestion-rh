import { database } from "../database.js";
import { joursRestant } from "../helpers/employeHelper.js";

const absencesResolvers = {
    Query: {
        getAbsence: async (parent, { id }, { user }, info) => {
            const absence = await database.select().from("absence").where("id", id)

            if (!user || (user.id != absence[0].employe_id && user.role != "rh")) {
                throw new Error("User not authorized to perform this action.")
            }
            return absence[0]
        },
        getAbsences: async (parent, args, { user }, info) => {
            if (!user || user.role != "rh") {
                throw new Error("User not authorized to perform this action.")
            }
            return await database.select().from('absence');
        },
        getUserAbsences: async (parent, { userId }, { user }, info) => {
            const absences = await database.select().from("absence").where("employe_id", userId)

            if (!user || (user.id != userId && user.role != "rh")) {
                throw new Error("User not authorized to perform this action.")
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
        addAbsence: async (parent, { employe_id, date_debut, date_fin }, { user }, info) => {
            if (!user || user.id != employe_id) {
                throw new Error("User not authorized to perform this action.")
            }

            const duree = 1 + ((date_fin - date_debut)/86400000)
            
            dureeRestant = await joursRestant(employe_id)

            if(dureeRestant < duree) {
                throw new Error("You don't have enough days left banked to take an other paid leave.")
            }

            const absence = {
                "employe_id": employe_id,
                "date_debut": date_debut,
                "date_fin": date_fin,
                "duree": duree
            }

            await database("absence").insert(absence);
            return "Absence Created"
        },
        deleteAbsence: async (parent, { id }, { user }, info) => {
            if (!user || (user.id != id && user.role != "rh")) {
                throw new Error("User not authorized to perform this action.")
            }
            await database("absence").where("id", id).delete()
            return "Absence as been deleted"
        }
    }
};

export default absencesResolvers;