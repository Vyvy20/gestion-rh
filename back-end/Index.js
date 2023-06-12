import {
    ApolloServer
} from 'apollo-server';
import absencesSchemas from './schemas/absence-schemas.js';
import employesSchemas from './schemas/employe-schemas.js';
import absencesResolvers from './resolvers/absence-resolvers.js';
import employesResolvers from './resolvers/employe-resolvers.js';
import { GraphQLScalarType, Kind } from 'graphql';

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
  ...absencesResolvers.Mutation
}

console.log(RESOLVERS)

const server = new ApolloServer({
    typeDefs: SCHEMAS,
    resolvers: RESOLVERS
});
server.listen().then(({
    url
}) => {
    console.log(`🚀  Server ready at ${url}`);
});
