const employeSchemas = `#graphql
    extend type Query {
        getEmploye(id: Int!): Employe
        getEmployes: [Employe] 
        getMe: Employe
    }
    
    type Mutation {
        addEmploye(prenom: String!, nom: String!, email: String!, telephone: String, poste: String, salaire: Int, password: String!, jours: Int!): String
        deleteEmploye(id: Int!): String
        deleteEmployes(ids: [Int!]): String
        updateEmploye(id: Int!, prenom: String, nom: String, email: String, telephone: String, poste: String, salaire: Int, jours: Int): String
        changePassword(id: Int!, currentPassword: String!, newPassword: String!): String
    }

    type Employe {
        id: Int!
        nom: String!
        prenom: String!
        email: String!
        telephone: String
        poste: String
        salaire: Int
        jours: Int
        joursRestant: Int
        joursPrit: Int
        role: String
    }
`;

export default employeSchemas;