import { Optional } from "sequelize/types"

export interface GetAllFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
}