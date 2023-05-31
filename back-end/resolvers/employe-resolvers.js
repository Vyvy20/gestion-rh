import { database } from "../connection.js";

const employesResolvers = {
    Query: {
        getEmploye: (parent, args, context, info) => {
            return []
        },
        getEmployes: async (parent, args, context, info) => {
            return await database.select().from('employe');
        }
    },
};

export default employesResolvers;
