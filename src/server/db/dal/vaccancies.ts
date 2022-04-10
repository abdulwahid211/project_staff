
import { and, Op } from 'sequelize'
import { Vacancy, VacancyInput, VacancyOutput } from '../../model/vacancy.model';
import { GetAllFilters } from './types'

export const getAll = async (filters?: GetAllFilters): Promise<VacancyOutput[]> => {
    return Vacancy.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}

export const findById = async (VacancyID: number): Promise<VacancyOutput> => {
    const vacancy = await Vacancy.findByPk(VacancyID)
    return vacancy;
}

export const updateVacancy = async (VacancyID: number, payload: VacancyInput): Promise<VacancyOutput> => {
    const vacancy = await Vacancy.findByPk(VacancyID)
    const updatedVacancy = await vacancy.update(payload)
    return updatedVacancy
}

export const createVacancy = async (vacancy: VacancyInput): Promise<boolean> => {
    const newVacancy = await Vacancy.create({
        Title: vacancy.Title, Created: vacancy.Created, Description: vacancy.Description, EmployerID: vacancy.EmployerID
    });
    return !!newVacancy
}


export const deleteVacancy = async (VacancyID: number): Promise<Boolean> => {
    const vacancy = await Vacancy.destroy({
        where: {
            VacancyID: VacancyID
        }
    })
    return !!vacancy;
}