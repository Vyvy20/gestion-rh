import {
    gql
} from 'apollo-server';

const userSchemas = gql `
    type Mutation {
        connect(email: String!, password: String!): String
        disconnect: String
    }
`;

export default userSchemas;