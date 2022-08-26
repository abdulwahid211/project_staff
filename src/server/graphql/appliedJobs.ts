import {gql} from 'apollo-server-express';
import {
  GetAllAppliedJobs,
  GetAppliedJob,
  CreateAppliedJobs,
  DeleteAppliedJobs,
  VerifyAlreadyAppliedJob,
} from '../model/AppliedJobsModel';

export const typeAppliedJobs = gql`
  extend type Query {
    appliedJobs: [AppliedJobs]
    appliedJob(appliedJobsID: ID!): AppliedJobs
    verifyAlreadyAppliedJob(ApplicantID: ID!, VacancyID: ID!): Boolean!
  }
  type AppliedJobs {
    AppliedJobsID: ID!
    ApplicantID: ID!
    VacancyID: ID!
  }
  extend type Mutation {
    createAppliedJobs(ApplicantID: ID!, VacancyID: ID!): Boolean!
    deleteAppliedJobs(AppliedJobsID: ID!): Boolean!
  }
`;

export const resolversAppliedJobs = {
  Query: {
    appliedJobs: async () => GetAllAppliedJobs(),
    appliedJob: async (obj, args, context, info) =>
      GetAppliedJob(args.appliedJobsID),
    verifyAlreadyAppliedJob: async (obj, args, context, info) =>
      VerifyAlreadyAppliedJob(args.ApplicantID, args.VacancyID),
  },

  Mutation: {
    createAppliedJobs: async (obj, args, context, info) =>
      CreateAppliedJobs(args),
    deleteAppliedJobs: async (obj, args, context, info) =>
      DeleteAppliedJobs(args.appliedJobsID),
  },
};
