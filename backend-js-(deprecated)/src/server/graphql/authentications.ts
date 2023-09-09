import {gql} from 'apollo-server';
import {
  AdminLogin,
  ApplicantLogin,
  EmployerLogin,
  ForgottenPasswordLogin,
} from '../model/authenticationModel';

export const typeAuthUserInput = gql`
  type Mutation {
    adminsLogin(Email: String!, Password: String!): AuthPayLoad!
    applicantLogin(Email: String!, Password: String!): AuthPayLoad!
    employerLogin(Email: String!, Password: String!): AuthPayLoad!
    forgottenPasswordLogin(Email: String!): String!
  }
  type AuthPayLoad {
    token: String!
    id: String!
  }
`;

export const resolversAuthentication = {
  Mutation: {
    adminsLogin: async (obj, args, context, info) => AdminLogin(args),
    applicantLogin: async (obj, args, context, info) => ApplicantLogin(args),
    employerLogin: async (obj, args, context, info) => EmployerLogin(args),
    forgottenPasswordLogin: async (obj, args, context, info) =>
      ForgottenPasswordLogin(args),
  },
};
