import { Db } from '../db/sql/dbConfig'
import {ComparePassword} from '../util/passwordUtil'
import {GenerateAccessToken} from '../util/tokenMethods'

export class UserLoginInput {
    public Email!: string;
    public Password!: string;
  }

export const AdminLogin = async (object: UserLoginInput) => {
    const FindAdminQueryString = `
    SELECT * from Admin where Email=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindAdminQueryString, [object.Email]);

    if(row[0]){
    const passwordResult = await ComparePassword(object.Password, row[0].Password)
    if(row[0].Email == object.Email && passwordResult){
          return {token:GenerateAccessToken(row[0].Email)}
    }
    return {token:"Incorrect Details"}
    }
    else{
        return {token:"Not Found"}
    }
}

export const ApplicantLogin = async (object: UserLoginInput) => {
    const FindApplicantQueryString = `
    SELECT * from Applicants where Email=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindApplicantQueryString, [object.Email]);

    if(row[0]){
    const passwordResult = await ComparePassword(object.Password, row[0].Password)
    if(row[0].Email == object.Email && passwordResult){
          return {token:GenerateAccessToken(row[0].Email)}
    }
    return {token:"Incorrect Details"}
    }
    else{
        return {token:"Not Found"}
    }
}




