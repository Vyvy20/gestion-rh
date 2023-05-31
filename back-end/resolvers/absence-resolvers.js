const absencesResolvers = {
    Query: {
        getAbsence: (parent, args, context, info) => {
            return {
                "id": args.id
            }
        }
    },
 };

export default absencesResolvers;