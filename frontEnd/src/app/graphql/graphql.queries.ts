import {gql} from 'apollo-angular'

export const APPLICANT_LOGIN = gql
`mutation Mutation($email: String!, $password: String!) {
    applicantLogin(Email: $email, Password: $password) {
      token, id
    }
  }`

  export const ADMIN_LOGIN = gql
`mutation Mutation($email: String!, $password: String!) {
    adminLogin(Email: $email, Password: $password) {
      token, id
    }
  }`

  export const GET_APPLICANT_PROFILE = gql
  `query Query($email: String!) {
    applicant(Email: $email) {
      ApplicantID
      FirstName
      LastName
      Address
      City
      Postcode
      Email
      Password
    }
  }`
  

  export const CREATE_APPLICANT_PROFILE = gql
`mutation Mutation($lastName: String!, $firstName: String!, $email: String!, $password: String!, $address: String!, $city: String!, $postcode: String!) {
  createApplicant(LastName: $lastName, FirstName: $firstName, Email: $email, Password: $password, Address: $address, City: $city, Postcode: $postcode)
}`