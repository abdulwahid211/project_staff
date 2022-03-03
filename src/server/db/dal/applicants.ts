
import {Op} from 'sequelize'
import { Applicants } from '../../model/applicant.model'
import { GetAllApplicantsFilters } from './types'
import { ApplicantInput, ApplicantOutput } from '../../model/applicant.model' 

export const getAll = async (filters?: GetAllApplicantsFilters): Promise<ApplicantOutput[]> => {
    return Applicants.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}