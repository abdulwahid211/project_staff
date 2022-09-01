import {gql} from 'apollo-server-express';
import {
  GetAllApplicants,
  GetApplicant,
  CreateApplicant,
  UpdateApplicant,
  DeleteApplicant,
} from '../model/applicantModel';

export const typeApplicants = gql`
  extend type Query {
    applicants: [Applicant]
    applicant(Email: String!): Applicant
  }
  type Applicant {
    ApplicantID: ID!
    LastName: String!
    FirstName: String!
    Address: String!
    City: String!
    Postcode: String!
    Email: String!
    Password: String!
  }

  extend type Mutation {
    createApplicant(
      LastName: String!
      FirstName: String!
      Email: String!
      Password: String!
      Address: String!
      City: String!
      Postcode: String!
    ): Boolean!
    deleteApplicant(Email: String!): Boolean!
    updateApplicant(
      LastName: String!
      FirstName: String!
      Email: String!
      Password: String!
      Address: String!
      City: String!
      Postcode: String!
    ): Boolean!
  }
`;

export const resolversApplicants = {
  Query: {
    applicants: async (obj, args, context, info) =>
      GetAllApplicants(context.req),

    applicant: async (obj, args, context, info) =>
      GetApplicant(args.Email, context.req),
  },

  Mutation: {
    createApplicant: async (obj, args, context, info) => CreateApplicant(args),

    deleteApplicant: async (obj, args, context, info) =>
      DeleteApplicant(args.Email, context.req),

    updateApplicant: async (obj, args, context, info) =>
      UpdateApplicant(args, context.req),
  },
};
