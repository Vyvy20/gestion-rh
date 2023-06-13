import { gql } from '@apollo/client';

export const GET_EMPLOYES = gql`
  query Query {
    getEmployes {
      id
      nom
      prenom
      email
      telephone
      poste
      salaire
      jours
      joursRestant
      joursPrit
    }
  }
`;
