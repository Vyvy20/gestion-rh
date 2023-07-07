import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import absencesSchemas from './schemas/absence-schemas.js';
import employesSchemas from './schemas/employe-schemas.js';
import userSchemas from './schemas/user-schemas.js'
import absencesResolvers from './resolvers/absence-resolvers.js';
import employesResolvers from './resolvers/employe-resolvers.js';
import userResolvers from './resolvers/user-resolvers.js';
import { GraphQLScalarType, Kind } from 'graphql';
import getUser from "./connection.js";


const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }

    // Invalid hard-coded value (not an integer)
    return null;
  },
});



const SCHEMAS = [
    employesSchemas,
    absencesSchemas,
	userSchemas
];



let RESOLVERS = {
    Date: dateScalar,
    ...employesResolvers,
}

RESOLVERS.Query = {
  ...RESOLVERS.Query,
  ...absencesResolvers.Query
}

RESOLVERS.Mutation = {
  ...RESOLVERS.Mutation,
  ...absencesResolvers.Mutation,
  ...userResolvers.Mutation
}

const server = new ApolloServer({
    typeDefs: SCHEMAS,
    resolvers: RESOLVERS
});
const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
        const token = req.headers.authorization || '';

        // Try to retrieve a user with the token
        const user = await getUser(token);

        // Add the user to the context
        return { user };
  },
});


console.log(`🚀 Server listening at: ${url}`);