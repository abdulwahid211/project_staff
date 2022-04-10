import { IAppliedJobs } from '../../interfaces/Modelnterfaces'
import { GetAllFilters } from '../../db/dal/types'
import { AppliedJobs, AppliedJobsInput } from '../../model/appliedJobs.model';
import * as AppliedDal from '../../db/dal/appliedJobs'

export const getAll = async (filters: GetAllFilters): Promise<IAppliedJobs[]> => {
    return (await AppliedDal.getAll(filters))
}

export const findById = async (AppliedJobsID: number): Promise<AppliedJobs> => {
    return (await AppliedDal.findById(AppliedJobsID))
}

export const updateAppliedJobss = async (AppliedJobssID: number, payload: AppliedJobs): Promise<AppliedJobs> => {
    var result: AppliedJobs = (await AppliedDal.updateAppliedJobs(AppliedJobssID, payload));
    return result
}

export const createAppliedJobs = async (AppliedJobs: AppliedJobsInput): Promise<Boolean> => {
    var result = (await AppliedDal.createAppliedJobs(AppliedJobs));
    return result
}

export const deleteAppliedJobs = async (AppliedJobsID: number): Promise<Boolean> => {
    var result = AppliedDal.deleteAppliedJobs(AppliedJobsID)
    return result
}