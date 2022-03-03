import { Optional } from "sequelize/types"

export type CreateApplicantDTO = {
    ApplicantID: number,
    LastName: string,
    FirstName: string,
    Address: string,
    City: string
}

export type UpdateApplicantDTO = Optional<CreateApplicantDTO, 'ApplicantID'>

export type FilterApplicantsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}