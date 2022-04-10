import { IAdmin } from '../../interfaces/Modelnterfaces'
import { GetAllFilters } from '../../db/dal/types'
import { AdminInput, Admin } from '../../model/admin.model';
import * as AdminsDal from '../../db/dal/Admin'

export const getAll = async (filters: GetAllFilters): Promise<IAdmin[]> => {
    return (await AdminsDal.getAll(filters))
}

export const findById = async (AdminID: number): Promise<Admin> => {
    return (await  AdminsDal.findById(AdminID))
}

export const updateAdmins = async(AdminsID:number,payload:Admin): Promise<Admin> =>{
    var result:Admin =  (await AdminsDal.updateAdmin(AdminsID,payload));
    return result
}

export const createAdmin = async(Admin:AdminInput): Promise<Boolean> =>{
    var result =  (await AdminsDal.createAdmin(Admin));
    return result
}

export const deleteAdmin = async (AdminID: number): Promise<Boolean> => {
  var result =  AdminsDal.deleteAdmin(AdminID)
  return result
}