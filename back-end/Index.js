import {
    ApolloServer
} from 'apollo-server';
import absencesSchemas from './schemas/absence-schemas.js';
import absencesResolvers from './resolvers/absence-resolvers.js'

const SCHEMAS = [
    absencesSchemas,
];

const RESOLVERS = [
    absencesResolvers,
]

const server = new ApolloServer({
    typeDefs: SCHEMAS,
    resolvers: RESOLVERS
});
server.listen().then(({
    url
}) => {
    console.log(`🚀  Server ready at ${url}`);
});