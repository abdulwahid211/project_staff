import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    extend type Query {
        appliedJobs: [AppliedJobs]
        appliedJobs(appliedJobsID: ID!): AppliedJobs
    }
    type AppliedJobs {
        AppliedJobsID: ID!
        ApplicantID: ID!
        VacancyID: ID!
    }
`