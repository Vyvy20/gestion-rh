import { gql } from '@apollo/client';

export const GET_ME = gql`
query Query {
    getMe {
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
    mutation Mutation($id: Int!, $prenom: String, $nom: String, $email: String, $telephone: String) {
        updateEmploye(id: $id, prenom: $prenom, nom: $nom, email: $email, telephone: $telephone)
    }
`;

export const UPDATE_PASSWORD = gql`
mutation Mutation($id: Int!, $currentPassword: String!, $newPassword: String!) {
    changePassword(id: $id, currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;