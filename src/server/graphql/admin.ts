import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    extend type Query {
        admins: [Admin]
        admin(id: ID!): Admin
    }
    type Admin {
        ApplicantID: ID!
        LastName: String!
        FirstName: String!
        Email: String;
        Password: String!
    }
`