import {
    gql
} from 'apollo-server';

const absencesSchemas = gql `
    scalar Date

    type Query {
        getAbsence(id: Int!): Absence!
        getAbsences: [Absence!]
    }

    type Mutation {
        addAbsence(employe_id: Int!, date_debut: Date!, date_fin: Date!): String!
        validate(id: Int!): String!
    }

    type Absence {
        id: Int!
        employe_id: Int!
        date_debut: Date!
        date_fin: Date!
        valide: Boolean
        duree: Int!
    }
`;

export default absencesSchemas;