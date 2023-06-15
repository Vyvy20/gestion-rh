const userSchemas = `#graphql
    type Mutation {
        connect(email: String!, password: String!): Token
        disconnect: String
    }

    type Token {
        token: String!
        role: String!
        id: Int!
    }
`;

export default userSchemas;