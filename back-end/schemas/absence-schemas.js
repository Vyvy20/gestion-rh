import { gql } from 'apollo-server';

const absencesSchemas = gql`
    type Query {
        getAbsence(id: Int!): Absence 
    }

    type Absence {
        id: Int!
    }
`;

export default absencesSchemas;