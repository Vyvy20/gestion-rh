const employesResolvers = {
    Query: {
        getEmploye: (parent, args, context, info) => {
            return {
                "id": args.id
            }
        },
        getEmployes: (parent, args, context, info) => {
            return [
                {
                    "id": 1
                }
            ]
        }
    },
};

export default employesResolvers;
