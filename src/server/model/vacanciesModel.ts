import { Db } from '../db/sql/dbConfig'
export class Vacancies {
    public VacancyID!: number;
    public Title!: string;
    public Description!: string;
    public Created!: String;
    public EmployerID!: number;
}


export const CreateVacancies = async (object: any) => {
    const CreateQueryString = "INSERT INTO Vacancies (Title, Description, Created, EmployerID) VALUES (?,?,?,?)"
    const formatDate = new Date(object.Created)
    Db.query(
        CreateQueryString,
        [object.Title, object.Description,object.Created,object.EmployerID], (err, results) => {
            if (err)
                console.log(err);
        }
    );

    const FindVacanciesQueryString = `
    SELECT * from Vacancies where Created=? And EmployerID=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindVacanciesQueryString, [object.Created,object.EmployerID]);
    if(row[0] == undefined){
        return false
    }
        return true
}

export const UpdateVacancies = async (object: any) => {
    const UpdateQueryString = "Update Vacancies set Title=?,Description=?,Created=?,EmployerID=? where VacancyID=?;"
    console.log("Output abzy1 "+object.Created)
    Db.query(
        UpdateQueryString,
        [object.Title, object.Description, object.Created, object.EmployerID, object.VacancyID], (err, results) => {
            if (err)
                console.log(err);
        }
    );
    const FindVacanciesQueryString = `
    SELECT * from Vacancies where VacancyID=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindVacanciesQueryString, [object.VacancyID]);
    return row[0]
}

export const DeleteVacancies = async (VacancyID: number) => {
    console.log("Output: " + VacancyID)
    const CreateQueryString = "Delete from Vacancies where VacancyID=?;"
    Db.query(
        CreateQueryString,
        [VacancyID], (err, results) => {
            if (err)
                console.log(err);
        }
    );
    const FindVacanciesQueryString = `
    SELECT * from Vacancies where VacancyID=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindVacanciesQueryString, [VacancyID]);
    if (row[0] == undefined) {
        return true;
    }
    else {
        return false;
    }
}

export const GetAllVacancies = async () => {
    const queryString = `
      SELECT * from Vacancies;`
    const promisePool = Db.promise();
    const [rows] = await promisePool.execute(queryString);
    console.log(JSON.stringify(rows))
    return rows
}


export const GetVacancy = async (VacancyID:number) => {
    const queryString = `
      SELECT * from Vacancies where VacancyID=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(queryString,[VacancyID]);
    console.log("Output: "+JSON.stringify(row))
    return row[0]
}

