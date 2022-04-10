
import { and, Op } from 'sequelize'
import { Employer } from '../../model/employer.model';
import { GetAllFilters } from './types'
import { EmployerInput, EmployerOutput } from '../../model/employer.model'
import { IEmployer } from '../../interfaces/Modelnterfaces';

export const getAll = async (filters?: GetAllFilters): Promise<EmployerOutput[]> => {
    return Employer.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}

export const findByEmployer = async (applicants: IEmployer): Promise<EmployerOutput> => {
    const Applicant = await Employer.findOne({
        where: {
            Name: applicants.Name,
            Email: applicants.Email
        }
    })
    return Applicant;
}

export const findById = async (employerId: number): Promise<EmployerOutput> => {
    const employer = await Employer.findByPk(employerId)
    return employer;
}

export const updateEmployer = async (employerId: number, payload: EmployerInput): Promise<EmployerOutput> => {
    const employer = await Employer.findByPk(employerId)
    const updatedEmployer = await employer.update(payload)
    return updatedEmployer
}

export const createEmployer = async (employer: EmployerInput): Promise<boolean> => {
    const newApplicant = await Employer.create({
        Name: employer.Name, Address: employer.Address, City: employer.City, Email: employer.Email,
        Postcode: employer.Postcode,  Password: employer.Password
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