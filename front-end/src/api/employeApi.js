import { gql } from '@apollo/client';

export const GET_EMPLOYE = gql`
  query Query($employeId: Int!) {
    getEmploye(id: $employeId) {
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
      role
    }
  }
`;

export const UPDATE_EMPLOYE = gql`
  mutation Mutation(
    $id: Int!
    $prenom: String
    $nom: String
    $email: String
    $telephone: String
  ) {
    updateEmploye(
      id: $id
      prenom: $prenom
      nom: $nom
      email: $email
      telephone: $telephone
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
