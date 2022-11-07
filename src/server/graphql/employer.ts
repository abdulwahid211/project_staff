import {gql} from 'apollo-server-express';
import {
  GetAllEmployers,
  GetEmployer,
  CreateEmployer,
  UpdateEmployer,
  DeleteEmployer,
} from '../model/employerModel';

export const typeEmployer = gql`
  type Query {
    Employers: [Employer]
    Employer(Email: String!): Employer
  }
  type Employer {
    EmployerID: ID!
    Name: String!
    Address: String!
    City: String!
    Postcode: String!
    Email: String!
    Telephone: String!
  }

  type Mutation {
    createEmployer(
      Name: String!
      Email: String!
      Telephone: String!
      Address: String!
      City: String!
      Postcode: String!
    ): Boolean!
    deleteEmployer(Email: String!): Boolean!
    updateEmployer(
      Name: String!
      Email: String!
      Telephone: String!
      Address: String!
      City: String!
      Postcode: String!
    ): Boolean!
  }
`;

export const resolversEmployers = {
  Query: {
    Employers: async (obj, args, context, info) => GetAllEmployers(context.req),
    Employer: async (obj, args, context, info) =>
      GetEmployer(args.Email, context.req),
  },

  Mutation: {
    createEmployer: async (obj, args, context, info) =>
      CreateEmployer(args, context.req),
    deleteEmployer: async (obj, args, context, info) =>
      DeleteEmployer(args.Email, context.req),
    updateEmployer: async (obj, args, context, info) =>
      UpdateEmployer(args, context.req),
  },
};
