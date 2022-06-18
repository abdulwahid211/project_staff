import { IVacancies } from '../../interfaces/Modelnterfaces'
import { GetAllFilters } from '../../db/dal/types'
import { Vacancy, VacancyInput } from '../../model/vacancy.model';
import * as VacancyDal from '../../db/dal/vaccancies'

export const getAll = async (filters: GetAllFilters): Promise<IVacancies[]> => {
    return (await VacancyDal.getAll(filters))
}

export const findById = async (AppliedJobsID: number): Promise<IVacancies> => {
    return (await VacancyDal.findById(AppliedJobsID))
}

export const updateVacancy = async (AppliedJobssID: number, payload: Vacancy): Promise<Vacancy> => {
    var result: Vacancy = (await VacancyDal.updateVacancy(AppliedJobssID, payload));
    return result
}

export const createVacancy = async (AppliedJobs: VacancyInput): Promise<Boolean> => {
    var result = (await VacancyDal.createVacancy(AppliedJobs));
    return result
}

export const deleteVacancy = async (AppliedJobsID: number): Promise<Boolean> => {
    var result = VacancyDal.deleteVacancy(AppliedJobsID)
    return result
}