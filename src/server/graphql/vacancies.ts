import { gql } from 'apollo-server-express'
import { GetAllVacancies, GetVacancy, CreateVacancies, UpdateVacancies, DeleteVacancies } from '../model/vacanciesModel'
//
export const typeVacancies = gql`

scalar Date
    extend type Query {
        Vacancies: [Vacancies]
        Vacancy(VacancyID: ID!): Vacancies
    }
    type Vacancies {
        VacancyID: ID!
        EmployerID: ID
        Title: String!
        Description: String!
        Created: Date!
    }

    extend type Mutation {
        createVacancies(
            EmployerID: ID!,
            Title: String!,
            Description: String!,
            Created: Date!): Boolean!
        deleteVacancies(
            VacancyID: ID!): Boolean
        updateVacancies(
            VacancyID: ID!,
            EmployerID: ID!,
            Title: String!,
            Description: String!,
            Created: Date!): Vacancies!
    }
`

export const resolversVacancies = {
    Query: {
        Vacancies: async () => GetAllVacancies(),
        Vacancy: async (obj, args, context, info) => GetVacancy(args.VacancyID)
    },

    Mutation: {
        createVacancies: async (obj, args, context, info) => CreateVacancies(args),
        deleteVacancies: async (obj, args, context, info) => DeleteVacancies(args.VacancyID),
        updateVacancies: async (obj, args, context, info) => UpdateVacancies(args)
    }
}