import { gql } from '@apollo/client';;

export const SIGNUP = gql`
mutation addUser($email: String, $username: String, $password: String!) {
  addUser(email: $email, username: $username, password: $password){
    token
    user{
      email
      username
      password
    }
  }
}
`;

export const LOGIN = gql`
  mutation login($email: String, $username: String, $password: String!) {
    login(email: $email, username: $username, password: $password){
      token
      user{
        email
        username
        password
      }
    }
  }
`;
