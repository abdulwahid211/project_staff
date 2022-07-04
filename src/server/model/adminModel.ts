import { Db } from '../db/sql/dbConfig'
export class Admin {
    public AdminID!: number;
    public LastName!: string;
    public FirstName!: string;
    public Email!: string;
    public Password!: string;
}


export const CreateAdmin = async(object: any) => {

    const CreateQueryString = "INSERT INTO Admin (LastName, FirstName, Email, Password) VALUES (?,?,?,?)"
    Db.query(
        CreateQueryString,
        [object.FirstName, object.LastName, object.Email, object.Password], (err, results) => {
            if(err)
            console.log(err); 
        }
    );

    const FindAdminQueryString = `
    SELECT * from Admin where Email=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindAdminQueryString, [object.Email]);
    return row[0].Email === object.Email

}

export const GetAllAdmins = async (callback: Function) => {
    const queryString = `
      SELECT * from Admin;`

    var admins: any[] = [];
    const promisePool = Db.promise();
    const [rows] = await promisePool.execute(queryString);
    console.log(JSON.stringify(rows))
    return rows
}

