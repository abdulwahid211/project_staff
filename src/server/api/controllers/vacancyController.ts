import { IVacancies } from '../../interfaces/Modelnterfaces'
import { GetAllFilters } from '../../db/dal/types'
import { Vaccancy, VaccancyInput } from '../../model/vaccancy.model';
import * as VacancyDal from '../../db/dal/vaccancies'

export const getAll = async (filters: GetAllFilters): Promise<IVacancies[]> => {
    return (await VacancyDal.getAll(filters))
}

export const findById = async (AppliedJobsID: number): Promise<IVacancies> => {
    return (await VacancyDal.findById(AppliedJobsID))
}

export const updateAppliedJobss = async (AppliedJobssID: number, payload: AppliedJobs): Promise<AppliedJobs> => {
    var result: AppliedJobs = (await VacancyDal.updateAppliedJobs(AppliedJobssID, payload));
    return result
}

export const createAppliedJobs = async (AppliedJobs: AppliedJobsInput): Promise<Boolean> => {
    var result = (await VacancyDal.createAppliedJobs(AppliedJobs));
    return result
}

export const deleteAppliedJobs = async (AppliedJobsID: number): Promise<Boolean> => {
    var result = VacancyDal.deleteAppliedJobs(AppliedJobsID)
    return result
}