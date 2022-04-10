
import { and, Op } from 'sequelize'
import { AppliedJobs, AppliedJobsInput, AppliedJobsOutput } from '../../model/AppliedJobs.model';
import { GetAllFilters } from './types';

export const getAll = async (filters?: GetAllFilters): Promise<AppliedJobsOutput[]> => {
    return AppliedJobs.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}

export const findById = async (AppliedJobsId: number): Promise<AppliedJobsOutput> => {
    const appliedJobs = await AppliedJobs.findByPk(AppliedJobsId)
    return appliedJobs;
}

export const updateAppliedJobs = async (AppliedJobsId: number, payload: AppliedJobsInput): Promise<AppliedJobsOutput> => {
    const appliedJobs = await AppliedJobs.findByPk(AppliedJobsId)
    const updatedAppliedJobs = await appliedJobs.update(payload)
    return updatedAppliedJobs
}

export const createAppliedJobs = async (appliedJobs: AppliedJobsInput): Promise<boolean> => {
    const newAppliedJobs = await AppliedJobs.create({
        ApplicantID: appliedJobs.ApplicantID, VacancyID: appliedJobs.VacancyID
    });
    return !!newAppliedJobs
}


export const deleteAppliedJobs = async (AppliedJobsId: number): Promise<Boolean> => {
    const appliedJobs = await AppliedJobs.destroy({
        where: {
            AppliedJobsID: AppliedJobsId
        }
    })
    return !!appliedJobs;
}