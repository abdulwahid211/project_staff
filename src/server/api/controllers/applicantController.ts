import { IApplicants } from '../../interfaces/applicantInterfaces'
import { GetAllApplicantsFilters } from '../../db/dal/types'
import { ApplicantInput, ApplicantOutput, Applicants } from '../../model/applicant.model';
import * as applicantsDal from '../../db/dal/applicants'
import applicantsRouter from '../routes/applicantRoutes';
import { updateApplicant } from '../../db/dal/applicants';

export const getAll = async (filters: GetAllApplicantsFilters): Promise<IApplicants[]> => {
    return (await applicantsDal.getAll(filters))
}

export const findById = async (applicantID: number): Promise<Applicants> => {
    return (await  applicantsDal.findById(applicantID))
}

export const updateApplicants = async(applicantsID:number,payload:Applicants): Promise<Applicants> =>{
    var result:Applicants =  (await applicantsDal.updateApplicant(applicantsID,payload));
    return result
}

export const createApplicant = async(applicant:ApplicantInput): Promise<Boolean> =>{
    var result =  (await applicantsDal.createApplicant(applicant));
    return result
}

export const deleteApplicant = async (applicantID: number): Promise<Boolean> => {
  var result =  applicantsDal.deleteApplicant(applicantID)
  return result
}