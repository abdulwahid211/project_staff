
import { and, Op } from 'sequelize'
import { Admin } from '../../model/admin.model';
import { GetAllFilters } from './types'
import { AdminAttributes } from '../../model/admin.model'
import { IAdmin } from '../../interfaces/Modelnterfaces';

export const getAll = async (filters?: GetAllFilters): Promise<AdminAttributes[]> => {
    return Admin.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
    })
}

export const findByAdmin = async (_Admin: IAdmin): Promise<AdminAttributes> => {
    var _admin;
     _admin = await Admin.findOne({
        where: {
            FirstName: _Admin.FirstName,
            LastName: _Admin.LastName,
            AdminID: _Admin.AdminID,
            Email: _Admin.Email

        }
    })
    return _admin;
}

export const findById = async (AdminId: number): Promise<AdminAttributes> => {
    var admin;
    admin = await Admin.findByPk(AdminId)
    return admin;
}

export const updateAdmin = async (AdminId: number, payload: AdminAttributes): Promise<AdminAttributes> => {
    var admin;
    admin = await Admin.findByPk(AdminId)
    const updatedAdmin = await admin.update(payload)
    return updatedAdmin
}

export const findByAdminEmail = async (email: string): Promise<Boolean> => {
    
    console.log("TEST 1 2 3 4 5"+email)
    return true
//    const result = await Admin.findOne({
//         where: {
//             Email: email
//         }
//     })
//     return result;
}

export const createAdmin = async (admin: AdminAttributes): Promise<boolean> => {
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