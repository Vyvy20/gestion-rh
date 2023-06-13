import { gql } from '@apollo/client';

export const CONNECTION = gql`
mutation Mutation($email: String!, $password: String!) {
  connect(email: $email, password: $password) {
    token
    role
  }
}`;

export const DISCONNECT = gql`
mutation Mutation {
    disconnect
}`;
