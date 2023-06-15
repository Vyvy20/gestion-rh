import { database } from "../database.js";
import sha256 from "js-sha256"
import { joursRestant } from "../helpers/employeHelper.js";

const employesResolvers = {
    Query: {
        getEmploye: async (parent, { id }, { user }, info) => {
            if (!user || (user.id != id && user.role != "rh")) {
                throw new Error("User not authorized to perform this action.")
            }
            const result = await database.select().from("employe").where("id", id)
            return result[0]
        },
        getEmployes: async (parent, args, { user }, info) => {
            if (!user || user.role != "rh") {
                throw new Error("User not authorized to perform this action.")
            }
            return await database.select().from('employe');
        },
        getMe: async (parent, args, { user }, info) => {
            return user
        },
    },
    Mutation: {
        addEmploye: async (parent, {prenom, nom, email, telephone, poste, salaire, password, jours}, { user }, info) => {
            if (!user || user.role != "rh") {
                throw new Error("User not authorized to perform this action.")
            }
            const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
            if (!emailRegex.test(email)) {
                throw new Error("email format incorect");
            }

            const result = await database.select().from("employe").where("email", email)
            if(result.length > 0) {
                throw new Error("email already taken");
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
                throw new Error("User not authorized to perform this action.")
            }
            await database("employe").where("id", id).delete()
            console.log("Employé #" + id + " a bien été supprimé.")
            return "Employe Deleted"
        },
        deleteEmployes: async (parent, {ids}, { user }, info) => {
            if (!user || user.role != "rh") {
                throw new Error("User not authorized to perform this action.")
            }
            for (const id in ids) {
                await database("employe").where("id", ids[id]).delete()
                console.log("Employé #" + ids[id] + " a bien été supprimé." )
            }
            return "Employes Deleted"
        },
        updateEmploye: async (parent, args, { user }, info) => {
            if (!user || (user.id != args.id && user.role != "rh")) {
                throw new Error("User not authorized to perform this action.")
            }
            const id = args.id
            delete args.id
            await database("employe").where("id", id).update(args)
            return "Employe updated"
        },
        changePassword: async (parent, {id, currentPassword, newPassword}, { user }, info) => {
            if (!user || (user.id != id && user.role != "rh")) {
                throw new Error("User not authorized to perform this action.")
            }
            const result = await database.select("password").from("employe").where("id", id)
            if (result[0].password === sha256(currentPassword)) {
                await database("employe").where("id", id).update("password", sha256(newPassword))
                return "Password Changed"
            }
            else {
                throw new Error("Current Password is incorrect")
            }
        }
    },
    Employe: {
        joursRestant: async (parent, { args }, context, info) => {
            return await joursRestant(parent.id)
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
