import { gql } from 'apollo-server'
import { Admin, GetAllAdmins, CreateAdmin } from '../model/adminModel'

export const typeDefs = gql`
     type Query {
        admins: [Admin]
        admin(ApplicantID: ID!): Admin
    }
    type Admin {
        AdminID: ID!
        LastName: String!
        FirstName: String!
        Email: String
        Password: String!
    }

    type Mutation {
        createAdmin(
            LastName: String!,
            FirstName: String!,
            Email: String!,
            Password: String!): Boolean!
    }
`
export const resolvers = {
    Query: {
        admins: async () => GetAllAdmins((err: Error, admin: Admin[]) => {
            if (err) {
                console.log(err)
            }
        })
    },

    Mutation: {
        createAdmin: async (obj, args, context, info) => CreateAdmin(args)
    }
}