
import { and, Op } from 'sequelize'
import { Applicants } from '../../model/applicant.model';
import { GetAllApplicantsFilters } from './types'
import { ApplicantInput, ApplicantOutput } from '../../model/applicant.model'
import { IApplicants } from '../../interfaces/applicantInterfaces';

export const getAll = async (filters?: GetAllApplicantsFilters): Promise<ApplicantOutput[]> => {
    return Applicants.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}

export const findByApplicant = async (applicants: IApplicants): Promise<ApplicantOutput> => {
    const Applicant = await Applicants.findOne({
        where: {
            FirstName: applicants.FirstName,
            LastName: applicants.LastName,
            ApplicantID: applicants.ApplicantID,
            Address: applicants.Address,
            City: applicants.City

        }
    })
    return Applicant;
}

export const findById = async (applicantId: number): Promise<ApplicantOutput> => {
    const Applicant = await Applicants.findByPk(applicantId)
    return Applicant;
}