import { database } from "../connection.js";

const employesResolvers = {
    Query: {
        getEmploye: async (parent, args, context, info) => {
            const result = await database.select().from("employe").where("id", args.id)
            return result[0]
        },
        getEmployes: async (parent, args, context, info) => {
            return await database.select().from('employe');
        }
    },
};

export default employesResolvers;
