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

export const ADD_ABSENCE = gql`
mutation Mutation($employeId: Int!, $dateFin: Date!, $dateDebut: Date!) {
  addAbsence(employe_id: $employeId, date_fin: $dateFin, date_debut: $dateDebut)
}
`;

export const DELETE_ABSENCE = gql`
mutation Mutation($id: Int!) {
  deleteAbsence(id: $id)
}
`;