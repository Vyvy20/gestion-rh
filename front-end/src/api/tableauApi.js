import { gql } from '@apollo/client';
// Query
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

// Mutation
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

export const DELETE_EMPLOYE = gql`
  mutation DeleteEmploye($deleteEmployeId: Int!) {
    deleteEmploye(id: $deleteEmployeId)
  }
`;

export const DELETES_EMPLOYES = gql`
  mutation DeleteEmployes($ids: [Int!]) {
    deleteEmployes(ids: $ids)
  }
`;

export const UPDATE_EMPLOYES = gql`
  mutation UpdateEmploye(
    $updateEmployeId: Int!
    $jours: Int!
    $prenom: String
    $nom: String
    $email: String
    $telephone: String
    $poste: String
    $salaire: Int
  ) {
    updateEmploye(
      id: $updateEmployeId
      jours: $jours
      prenom: $prenom
      nom: $nom
      email: $email
      telephone: $telephone
      poste: $poste
      salaire: $salaire
    )
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation Mutation(
    $id: Int!
    $currentPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      id: $id
      currentPassword: $currentPassword
      newPassword: $newPassword
    )
  }
`;
