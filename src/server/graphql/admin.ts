import { gql } from 'apollo-server'
import { GetAllAdmins, CreateAdmin, DeleteAdmin, UpdateAdmin, GetAdmin } from '../model/adminModel'

export const typeAdmins = gql`
    extend type Query {
        admins: [Admin]
        admin(Email: String!): Admin
    }
    type Admin {
        AdminID: ID!
        LastName: String!
        FirstName: String!
        Email: String
        Password: String!
    }

    extend type Mutation {
        createAdmin(
            LastName: String!,
            FirstName: String!,
            Email: String!,
            Password: String!): Boolean!
        deleteAdmin(
            Email: String!): Boolean! 
        updateAdmin(
            LastName: String!,
            FirstName: String!,
            Email: String!,
            Password: String!): Admin!  
    }
`
export const resolversAdmins = {
    Query: {
        admins: async () => GetAllAdmins(),
        admin: async (obj, args, context, info) => GetAdmin(args.Email)
    },

    Mutation: {
        createAdmin: async (obj, args, context, info) => CreateAdmin(args),
        deleteAdmin: async (obj, args, context, info) => DeleteAdmin(args.Email),
        updateAdmin: async (obj, args, context, info) => UpdateAdmin(args)
    }
}

var a;