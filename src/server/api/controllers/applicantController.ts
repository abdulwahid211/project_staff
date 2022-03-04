import { IApplicants } from '../../interfaces/applicantInterfaces'
import { GetAllApplicantsFilters } from '../../db/dal/types'
import { ApplicantOutput, Applicants } from '../../model/applicant.model';
import * as applicantsDal from '../../db/dal/applicants'
import applicantsRouter from '../routes/applicantRoutes';

// const toApplicant = (applicants: Applicants): Applicants => ({
//     ApplicantID: applicants.ApplicantID,
//     LastName: applicants.LastName,
//     FirstName: applicants.FirstName,
//     Address: applicants.Address,
//     City: applicants.City
// })

export const getAll = async (filters: GetAllApplicantsFilters): Promise<IApplicants[]> => {
    return (await applicantsDal.getAll(filters))
}

export const findById = async (applicantID: number): Promise<Applicants> => {
    return (await  applicantsDal.findById(applicantID))
}