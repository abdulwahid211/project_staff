import * as service from '../../services/ApplicantService'
import {CreateApplicantDTO, UpdateApplicantDTO, FilterApplicantsDTO} from '../../api/dto/applicantDto'
import {IApplicants} from '../../interfaces/applicantInterfaces'
import { ApplicantOutput, Applicants } from '../../model/applicant.model';

 const toApplicant = (applicants: ApplicantOutput): IApplicants => ({
    ApplicantID: applicants.ApplicantID,
    LastName: applicants.LastName,
    FirstName: applicants.FirstName,
    Address:applicants.Address,
    City:applicants.City
})

export const getAll = async(filters: FilterApplicantsDTO): Promise<IApplicants[]> => {
    return (await service.getAll(filters)).map(toApplicant)
}