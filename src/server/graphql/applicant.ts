import {gql} from 'apollo-server-express';
import {GraphQLUpload} from 'graphql-upload';
import {
  GetAllApplicants,
  GetApplicant,
  CreateApplicant,
  UpdateApplicant,
  DeleteApplicant,
  GetApplicantAppliedJobs,
  UploadCV,
  DeleteCV,
  DownloadCV,
} from '../model/applicantModel';

export const typeApplicants = gql`
  scalar Upload

  extend type Query {
    applicants: [Applicant]
    applicant(Email: String!): Applicant
    applicantAppliedJobs(employerId: ID): [ApplicantApplied]
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

  type ApplicantApplied {
    VacancyID: ID!
    JobTitle: String!
    ApplicantID: ID!
    LastName: String!
    FirstName: String!
    Address: String!
    City: String!
    Postcode: String!
    Email: String!
  }

  type CV {
    Id: ID!
    File: Upload!
    Email: String!
    Filename: String!
    Uploaded: Date!
    Type: String!
    Size: Int!
  }

  extend type Mutation {
    uploadCV(
      File: Upload!
      Email: String!
      Filename: String!
      Created: Date!
      Type: String!
      Size: Int!
    ): Boolean!

    deleteCV(Email: String!): Boolean!
    downloadCV(Email: String): CV!

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

    applicantAppliedJobs: async (obj, args, context, info) =>
      GetApplicantAppliedJobs(args.employerId, context.req),
  },

  Mutation: {
    createApplicant: async (obj, args, context, info) => CreateApplicant(args),
    uploadCV: async (obj, args, context, info) => UploadCV(args),
    downloadCV: async (obj, args, context, info) =>
      DownloadCV(args.Email, context.req),
    deleteCV: async (obj, args, context, info) =>
      DeleteCV(args.Email, context.req),

    deleteApplicant: async (obj, args, context, info) =>
      DeleteApplicant(args.Email, context.req),

    updateApplicant: async (obj, args, context, info) =>
      UpdateApplicant(args, context.req),
  },
};
