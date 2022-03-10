import { Optional } from "sequelize/types"

export interface GetAllApplicantsFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}