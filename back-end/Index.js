import {
    ApolloServer
} from 'apollo-server';
import absencesSchemas from './schemas/absence-schemas.js';
import employesSchemas from './schemas/employe-schemas.js';
import absencesResolvers from './resolvers/absence-resolvers.js';
import employesResolvers from './resolvers/employe-resolvers.js';
    
const SCHEMAS = [
    employesSchemas,
    absencesSchemas,
];

const RESOLVERS = [
    employesResolvers,
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
