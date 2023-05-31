import {
    gql
} from 'apollo-server';

const employeSchemas = gql `
    type Query {
        getEmploye(id: Int!): Employe
        getEmployes: [Employe] 
    }

    type Employe {
        id: Int!
    }
`;

export default employeSchemas;