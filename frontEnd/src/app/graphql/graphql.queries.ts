import {gql} from 'apollo-angular'

export const APPLICANT_LOGIN = gql
`mutation Mutation($email: String!, $password: String!) {
    applicantLogin(Email: $email, Password: $password) {
      token
    }
  }`

  export const ADMIN_LOGIN = gql
`mutation Mutation($email: String!, $password: String!) {
    adminLogin(Email: $email, Password: $password) {
      token
    }
  }`

  