import { database } from "../database.js";
import sha256 from "js-sha256"

const employesResolvers = {
    Query: {
        getEmploye: async (parent, { id }, { user }, info) => {
            if (!user || (user.id != id && user.role != "rh")) {
                return null
            }
            const result = await database.select().from("employe").where("id", id)
            return result[0]
        },
        getEmployes: async (parent, args, { user }, info) => {
            if (!user || user.role != "rh") {
                return []
            }
            return await database.select().from('employe');
        }
    },
    Mutation: {
        addEmploye: async (parent, {prenom, nom, email, telephone, poste, salaire, password, jours}, { user }, info) => {
            if (!user || user.role != "rh") {
                return null
            }

            await database("employe").insert({
                nom: nom,
                prenom: prenom,
                email: email,
                telephone: telephone,
                poste: poste,
                salaire: salaire,
                password: sha256(password),
                jours: jours,
                role: "user"
            })
            return "Employe Created"
        },
        deleteEmploye: async (parent, {id}, { user }, info) => {
            if (!user || user.role != "rh") {
                return null
            }
            await database("employe").where("id", id).delete()
            console.log("Employé #" + id + " a bien été supprimé.")
            return "Employe Deleted"
        },
        deleteEmployes: async (parent, {ids}, { user }, info) => {
            if (!user || user.role != "rh") {
                return null
            }
            for (const id in ids) {
                await database("employe").where("id", ids[id]).delete()
                console.log("Employé #" + ids[id] + " a bien été supprimé." )
            }
            return "Employes Deleted"
        },
        updateEmploye: async (parent, args, { user }, info) => {
            if (!user || (user.id != id && user.role != "rh")) {
                return null
            }
            const id = args.id
            delete args.id
            await database("employe").where("id", id).update(args)
            return "Employe updated"
        },
        changePassword: async (parent, {id, currentPassword, newPassword}, { user }, info) => {
            if (!user || (user.id != id && user.role != "rh")) {
                return null
            }
            const result = await database.select("password").from("employe").where("id", id)
            if (result[0].password === sha256(currentPassword)) {
                await database("employe").where("id", id).update("password", sha256(newPassword))
                return "Password Changed"
            }
            else {
                return "Current Password is incorrect"
            }
        }
    },
    Employe: {
        joursRestant: async (parent, { args }, context, info) => {
            const results = await database.select("duree").from("absence").where("employe_id", parent.id)
            let duree = 0;
            results.forEach(result => {
                duree += result.duree
            });

            return parent.jours - duree
        },
        joursPrit: async (parent, { args }, context, info) => {
            const results = await database.select("duree").from("absence").where("employe_id", parent.id)
            let duree = 0;
            results.forEach(result => {
                duree += result.duree
            });

            return duree
        },
    }
};

export default employesResolvers;
