import {
    gql
} from 'apollo-server';

const userSchemas = gql `
    type Mutation {
        connect(email: String!, password: String!): Token
        disconnect: String
    }

    type Token {
        token: String!
        role: String!
    }
`;

export default userSchemas;