import { gql } from '@apollo/client';

export const GET_ABSENCE = gql`
query GetUserAbsences($userId: Int!) {
    getUserAbsences(userId: $userId) {
      id
      employe_id
      date_debut
      date_fin
      valide
      duree
    }
  }
`;

export const VALIDATE_ABSENCE = gql`
  mutation Mutation($id: Int!) {
    validate(id: $id)
  }
`;
