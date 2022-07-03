import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    extend type Query {
        employers: [Employer]
        employer(EmployerID: ID!): Employer
    }
    type Employer {
        EmployerID: ID!
        LastName: String!
        FirstName: String!
        Address: String!
        City: String!
        Postcode: String!
        Email: String;
        Password: String!
    }
`