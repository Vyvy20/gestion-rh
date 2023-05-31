import {
    gql
} from 'apollo-server';

const employeSchemas = gql `
    extend type Query {
        getEmploye(id: Int!): Employe!
        getEmployes: [Employe!] 
    }
    
    type Mutation {
        addEmploye(prenom: String!, nom: String!, email: String!, telephone: String, poste: String, salaire: Int): String!
        deleteEmploye(id: Int!): String!
    }

    type Employe {
        id: Int!
        nom: String!
        prenom: String!
        email: String!
        telephone: String
        poste: String
        salaire: Int
    }
`;

export default employeSchemas;