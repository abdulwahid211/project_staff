import { IApplicants } from '../../interfaces/Modelnterfaces'
import { GetAllFilters } from '../../db/dal/types'
import { ApplicantInput, Applicants } from '../../model/applicant.model';
import * as applicantsDal from '../../db/dal/applicants'

export const getAll = async (filters: GetAllFilters): Promise<IApplicants[]> => {
    return (await applicantsDal.getAll(filters))
}

export const findById = async (applicantID: number): Promise<Applicants> => {
    return (await  applicantsDal.findById(applicantID))
}

export const findByEmail = async (email: string): Promise<Boolean> => {
    return (await  applicantsDal.findByApplicantEmail(email))
}

export const updateApplicants = async(applicantsID:number,payload:Applicants): Promise<Applicants> =>{
    var result : Applicants =  (await applicantsDal.updateApplicant(applicantsID,payload));
    return result
}

export const createApplicant = async(applicant:ApplicantInput): Promise<Boolean> =>{
  
    var result =  (await applicantsDal.createApplicant(applicant));
    console.log("Results "+result)
    return result
}

export const deleteApplicant = async (applicantID: number): Promise<Boolean> => {
  var result =  applicantsDal.deleteApplicant(applicantID)
  return result
}