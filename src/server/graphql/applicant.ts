import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    extend type Query {
        applicants: [Applicant]
        applicant(ApplicantID: ID!): Applicant
    }
    type Applicant {
        ApplicantID: ID!
        LastName: String!
        FirstName: String!
        Address: String!
        City: String!
        Postcode: String!
        Email: String;
        Password: String!
    }
`