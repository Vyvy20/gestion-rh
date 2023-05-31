import { database } from "../connection.js";

const employesResolvers = {
    Query: {
        getEmploye: async (parent, { id }, context, info) => {
            const result = await database.select().from("employe").where("id", id)
            return result[0]
        },
        getEmployes: async (parent, args, context, info) => {
            return await database.select().from('employe');
        }
    },
    Mutation: {
        addEmploye: async (parent, {prenom, nom, email, telephone, poste, salaire}, context, info) => {
            const result = await database("employe").insert({
                nom: nom,
                prenom: prenom, 
                email: email,
                telephone: telephone,
                poste: poste,
                salaire: salaire
            })
            return "Employe Created"
        }
    }
};

export default employesResolvers;
