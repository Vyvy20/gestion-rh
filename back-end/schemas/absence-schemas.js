import {
    gql
} from 'apollo-server';

const absencesSchemas = gql `
    scalar Date

    type Query {
        getAbsence(id: Int!): Absence 
    }

    type Absence {
        id: Int!
        employe_id: Int!
        date_debut: Date!
        date_fin: Date!
        valide: Boolean
    }
`;

export default absencesSchemas;