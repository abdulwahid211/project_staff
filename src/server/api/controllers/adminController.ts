import { IAdmin } from '../../interfaces/Modelnterfaces'
import { GetAllFilters } from '../../db/dal/types'
import { AdminAttributes, Admin } from '../../model/admin.model'
import * as AdminsDal from '../../db/dal/Admin'

export const getAll = async (filters: GetAllFilters): Promise<AdminAttributes[]> => {
    return (await AdminsDal.getAll(filters))
}

export const findById = async (AdminID: number): Promise<AdminAttributes> => {
    return (await  AdminsDal.findById(AdminID))
}

export const findByEmail = async (email: string): Promise<AdminAttributes> => {
    return (await  AdminsDal.findByAdminEmail(email))
}

export const updateAdmins = async(AdminsID:number,payload:Admin): Promise<AdminAttributes> =>{
    var result =  (await AdminsDal.updateAdmin(AdminsID,payload));
    return result
}

export const createAdmin = async(Admin:AdminAttributes): Promise<Boolean> =>{
    var result =  (await AdminsDal.createAdmin(Admin));
    return result
}

export const deleteAdmin = async (AdminID: number): Promise<Boolean> => {
  var result =  AdminsDal.deleteAdmin(AdminID)
  return result
}