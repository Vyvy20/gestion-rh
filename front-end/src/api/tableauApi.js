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

export const ADD_EMPLOYE = gql`
  mutation AddEmploye(
    $prenom: String!
    $nom: String!
    $email: String!
    $password: String!
    $jours: Int!
    $telephone: String
    $poste: String
    $salaire: Int
  ) {
    addEmploye(
      prenom: $prenom
      nom: $nom
      email: $email
      password: $password
      jours: $jours
      telephone: $telephone
      poste: $poste
      salaire: $salaire
    )
  }
`;
