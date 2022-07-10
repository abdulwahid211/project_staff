import { Db } from '../db/sql/dbConfig'
import {PasswordHash, ComparePassword} from '../util/passwordUtil'
export class Admin {
    public AdminID!: number;
    public LastName!: string;
    public FirstName!: string;
    public Email!: string;
    public Password!: string;
}


export const CreateAdmin = async (object: Admin) => {
    const CreateQueryString = "INSERT INTO Admin (LastName, FirstName, Email, Password) VALUES (?,?,?,?)"
    const SecuredPassword = await PasswordHash(object.Password)
    Db.query(
        CreateQueryString,
        [object.FirstName, object.LastName, object.Email,SecuredPassword], (err, results) => {
            if (err)
                console.log(err);
        }
    );

    const FindAdminQueryString = `
    SELECT * from Admin where Email=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindAdminQueryString, [object.Email]);
    return row[0].Email === object.Email
}

export const UpdateAdmin = async (object: Admin) => {
    const UpdateQueryString = "Update Admin set FirstName=?,LastName=?,Password=?,Email=? where Email=?;"
    const SecuredPassword = await PasswordHash(object.Password)
    Db.query(
        UpdateQueryString,
        [object.FirstName, object.LastName, SecuredPassword, object.Email, object.Email], (err, results) => {
            if (err)
                console.log(err);
        }
    );
    const FindAdminQueryString = `
    SELECT * from Admin where Email=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindAdminQueryString, [object.Email]);
    return row[0]
}

export const DeleteAdmin = async (email: string) => {
    console.log("Output: " + email)
    const CreateQueryString = "Delete from Admin where Email=?;"
    Db.query(
        CreateQueryString,
        [email], (err, results) => {
            if (err)
                console.log(err);
        }
    );
    const FindAdminQueryString = `
    SELECT * from Admin where Email=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindAdminQueryString, [email]);
    if (row[0] == undefined) {
        return true;
    }
    else {
        return false;
    }
}

export const GetAllAdmins = async () => {
    const queryString = `
      SELECT * from Admin;`
    const promisePool = Db.promise();
    const [rows] = await promisePool.execute(queryString);
    console.log(JSON.stringify(rows))
    return rows
}


export const GetAdmin = async (email:string) => {
    const queryString = `
      SELECT * from Admin where Email=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(queryString,[email]);
    console.log("Output: "+JSON.stringify(row))
    return row[0]
}

