import {
    gql
} from 'apollo-server';

const employeSchemas = gql `
    extend type Query {
        getEmploye(id: Int!): Employe!
        getEmployes: [Employe!] 
    }
    
    type Mutation {
        addEmploye(prenom: String!, nom: String!, email: String!, telephone: String, poste: String, salaire: Int, password: String!): String!
        deleteEmploye(id: Int!): String!
        deleteEmployes(ids: [Int!]): String!
        updateEmploye(id: Int!, prenom: String, nom: String, email: String, telephone: String, poste: String, salaire: Int): String!
        changePassword(id: Int!, currentPassword: String!, newPassword: String!): String!
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