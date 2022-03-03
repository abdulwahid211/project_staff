import {Op} from 'sequelize'
import { GetAllApplicantsFilters } from '../db/dal/types'
import { ApplicantInput, ApplicantOutput } from '../model/applicant.model';
import * as applicantsDal from '../db/dal/applicants'

export const getAll = (filters: GetAllApplicantsFilters): Promise<ApplicantOutput[]> => {
    return applicantsDal.getAll(filters)
}