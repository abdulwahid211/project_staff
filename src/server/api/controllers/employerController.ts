import { IEmployer } from '../../interfaces/Modelnterfaces'
import { GetAllFilters } from '../../db/dal/types'
import { Employer, EmployerInput } from '../../model/employer.model';
import * as employerDal from '../../db/dal/employer'

export const getAll = async (filters: GetAllFilters): Promise<IEmployer[]> => {
    return (await employerDal.getAll(filters))
}

export const findById = async (EmployerID: number): Promise<Employer> => {
    return (await  employerDal.findById(EmployerID))
}

export const updateEmployer = async(EmployerID:number,payload:Employer): Promise<Employer> =>{
    var result:Employer =  (await employerDal.updateEmployer(EmployerID,payload));
    return result
}

export const createEmployer = async(Employer:EmployerInput): Promise<Boolean> =>{
    var result =  (await employerDal.createEmployer(Employer));
    return result
}

export const deleteEmployer = async (EmployerID: number): Promise<Boolean> => {
  var result =  employerDal.deleteEmployer(EmployerID)
  return result
}