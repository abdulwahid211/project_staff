import { GetAllFilters } from '../../db/dal/types'
import { EmployerAttributes, Employer } from '../../model/employer.model';
import * as employerDal from '../../db/dal/employer'

export const getAll = async (filters: GetAllFilters): Promise<EmployerAttributes[]> => {
    return (await employerDal.getAll(filters))
}

export const findById = async (EmployerID: number): Promise<EmployerAttributes> => {
    return (await  employerDal.findById(EmployerID))
}

export const findByEmail = async (email: string): Promise<EmployerAttributes> => {
    return (await  employerDal.findByEmployerEmail(email))
}

export const updateEmployer = async(EmployerID:number,payload:Employer): Promise<Employer> =>{
    var result: Employer =  (await employerDal.updateEmployer(EmployerID,payload));
    return result
}

export const createEmployer = async(Employer:EmployerAttributes): Promise<Boolean> =>{
    var result =  (await employerDal.createEmployer(Employer));
    return result
}

export const deleteEmployer = async (EmployerID: number): Promise<Boolean> => {
  var result =  employerDal.deleteEmployer(EmployerID)
  return result
}