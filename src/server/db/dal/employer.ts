
import { and, Op } from 'sequelize'
import { Employer } from '../../model/employer.model';
import { GetAllFilters } from './types'
import { EmployerAttributes } from '../../model/employer.model'
import { IEmployer } from '../../interfaces/Modelnterfaces';
import { PasswordHash } from '../../util/passwordUtil';

export const getAll = async (filters?: GetAllFilters): Promise<EmployerAttributes[]> => {
    return Employer.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}

export const findByEmployer = async (applicants: IEmployer): Promise<EmployerAttributes> => {
    let Applicant;
    Applicant = await Employer.findOne({
        where: {
            Name: applicants.Name,
            Email: applicants.Email
        }
    })
    return Applicant;
}

export const findById = async (employerId: number): Promise<EmployerAttributes> => {
    let employer;
    employer = await Employer.findByPk(employerId)
    return employer;
}

export const findByEmployerEmail = async (email: string): Promise<EmployerAttributes> => {
    let result;
    result = await Employer.findOne({
        where: {
            Email: email
        }
    })
    return result;
}

export const updateEmployer = async (employerId: number, payload: EmployerAttributes): Promise<EmployerAttributes> => {
    let employer;
    let updatedEmployer;
    employer = await Employer.findByPk(employerId)
    updatedEmployer = await employer.update(payload)
    return updatedEmployer
}

export const createEmployer = async (employer: EmployerAttributes): Promise<boolean> => {
    const securedPassword = await PasswordHash(employer.Password);
    const newApplicant = await Employer.create({
        Name: employer.Name, Address: employer.Address, City: employer.City, Email: employer.Email,
        Postcode: employer.Postcode, Password: securedPassword
    });
    return !!newApplicant
}


export const deleteEmployer = async (employerId: number): Promise<Boolean> => {
    const employer = await Employer.destroy({
        where: {
            EmployerID: employerId
        }
    })
    return !!employer;
}