
import { and, Op } from 'sequelize'
import { Applicants } from '../../model/applicant.model';
import { GetAllFilters } from './types'
import { ApplicantInput } from '../../model/applicant.model'
import { IApplicants } from '../../interfaces/Modelnterfaces';
import { PasswordHash } from '../../util/passwordUtil';

export const getAll = async (filters?: GetAllFilters): Promise<ApplicantInput[]> => {
    return Applicants.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}

export const findByApplicant = async (applicants: IApplicants): Promise<ApplicantInput> => {
    const applicant = await Applicants.findOne({
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
    return applicant;
}

export const findByApplicantEmail = async (email: string): Promise<Applicants> => {
    const applicant : Applicants= await Applicants.findOne({
        where: {
            Email: email
        }
    })
    return applicant;
}

export const findById = async (applicantId: number): Promise<ApplicantInput> => {
    const applicant = await Applicants.findByPk(applicantId)
    return applicant;
}

export const updateApplicant = async (applicantId: number, payload: ApplicantInput): Promise<Applicants> => {
    const applicant = await Applicants.findByPk(applicantId)
    const updatedApplicant = await applicant.update(payload)
    return updatedApplicant
}

export const createApplicant = async (applicant: ApplicantInput): Promise<boolean> => {

    const securedPassword = await PasswordHash(applicant.Password);
    const newApplicant = await Applicants.create({
        FirstName: applicant.FirstName, LastName: applicant.LastName, Address: applicant.Address, City: applicant.City,
        Postcode: applicant.Postcode, Email: applicant.Email, Password:securedPassword
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