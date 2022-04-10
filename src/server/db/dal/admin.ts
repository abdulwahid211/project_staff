
import { and, Op } from 'sequelize'
import { Admin } from '../../model/admin.model';
import { GetAllFilters } from './types'
import { AdminInput, AdminOutput } from '../../model/admin.model'
import { IAdmin } from '../../interfaces/Modelnterfaces';

export const getAll = async (filters?: GetAllFilters): Promise<AdminOutput[]> => {
    return Admin.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}

export const findByAdmin = async (_Admin: IAdmin): Promise<AdminOutput> => {
    const _admin = await Admin.findOne({
        where: {
            FirstName: _Admin.FirstName,
            LastName: _Admin.LastName,
            AdminID: _Admin.AdminID,
            Email: _Admin.Email

        }
    })
    return _admin;
}

export const findById = async (AdminId: number): Promise<AdminOutput> => {
    const admin = await Admin.findByPk(AdminId)
    return admin;
}

export const updateAdmin = async (AdminId: number, payload: AdminInput): Promise<AdminOutput> => {
    const admin = await Admin.findByPk(AdminId)
    const updatedAdmin = await admin.update(payload)
    return updatedAdmin
}

export const createAdmin = async (admin: AdminInput): Promise<boolean> => {
    const newAdmin = await Admin.create({
        FirstName: admin.FirstName, LastName: admin.LastName, Email: admin.Email, Password: admin.Password
    });
    return !!newAdmin
}


export const deleteAdmin = async (AdminId: number): Promise<Boolean> => {
    const admin = await Admin.destroy({
        where: {
            AdminID: AdminId
        }
    })
    return !!admin;
}