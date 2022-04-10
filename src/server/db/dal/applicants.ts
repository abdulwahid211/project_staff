
import { and, Op } from 'sequelize'
import { Applicants } from '../../model/applicant.model';
import { GetAllFilters } from './types'
import { ApplicantInput, ApplicantOutput } from '../../model/applicant.model'
import { IApplicants } from '../../interfaces/Modelnterfaces';

export const getAll = async (filters?: GetAllFilters): Promise<ApplicantOutput[]> => {
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
            City: applicants.City,
            Postcode: applicants.Postcode,
            Email: applicants.Email

        }
    })
    return Applicant;
}

export const findById = async (applicantId: number): Promise<ApplicantOutput> => {
    const Applicant = await Applicants.findByPk(applicantId)
    return Applicant;
}

export const updateApplicant = async (applicantId: number, payload: ApplicantInput): Promise<ApplicantOutput> => {
    const Applicant = await Applicants.findByPk(applicantId)
    const updatedApplicant = await Applicant.update(payload)
    return updatedApplicant
}

export const createApplicant = async (applicant: ApplicantInput): Promise<boolean> => {
    const newApplicant = await Applicants.create({
        FirstName: applicant.FirstName, LastName: applicant.LastName, Address: applicant.Address, City: applicant.City,
        Postcode: applicant.Postcode, Email: applicant.Email, Password: applicant.Password
    });
    return !!newApplicant
}


export const deleteApplicant = async (applicantId: number): Promise<Boolean> => {
    const Applicant = await Applicants.destroy({
        where: {
            ApplicantID: applicantId
        }
    })
    return !!Applicant;
}