import { gql } from 'apollo-server'
import {AdminLogin,ApplicantLogin} from '../model/authenticationModel'

export const typeAuthUserInput = gql`
type Mutation {
    adminLogin(
      Email: String!,
      Password: String!): AuthPayLoad!
    applicantLogin(
      Email: String!,
      Password: String!): AuthPayLoad!
  }
  type AuthPayLoad {
    token: String!
  }
`

export const resolversAuthentication = {
    Mutation: {
        adminLogin: async (obj, args, context, info) => AdminLogin(args),
        applicantLogin: async (obj, args, context, info) => ApplicantLogin(args)
    }
}