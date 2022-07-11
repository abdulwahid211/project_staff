import { Db } from '../db/sql/dbConfig'

export class AppliedJobs {
    public AppliedJobsID!: number;
    public ApplicantID!: number;
    public VacancyID!: number;
}


export const CreateAppliedJobs = async (object: AppliedJobs) => {
    const CreateQueryString = "INSERT INTO AppliedJobs (ApplicantID, VacancyID) VALUES (?,?)"
    Db.query(
        CreateQueryString,
        [object.ApplicantID, object.VacancyID ], (err, results) => {
            if (err)
                console.log(err);
        }
    );

    const FindAppliedJobsQueryString = `
    SELECT * from AppliedJobs where AppliedJobsID=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindAppliedJobsQueryString, [object.AppliedJobsID]);
    return row[0].AppliedJobsID === object.AppliedJobsID
}

export const DeleteAppliedJobs = async (AppliedJobs: number) => {
    const CreateQueryString = "Delete from AppliedJobs where AppliedJobsID=?;"
    Db.query(
        CreateQueryString,
        [AppliedJobs], (err, results) => {
            if (err)
                console.log(err);
        }
    );
    const FindAppliedJobsQueryString = `
    SELECT * from AppliedJobs where AppliedJobsID=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(FindAppliedJobsQueryString, [AppliedJobs]);
    if (row[0] == undefined) {
        return true;
    }
    else {
        return false;
    }
}

export const GetAllAppliedJobs = async () => {
    const queryString = `
      SELECT * from AppliedJobs;`
    const promisePool = Db.promise();
    const [rows] = await promisePool.execute(queryString);
    console.log(JSON.stringify(rows))
    return rows
}


export const GetAppliedJob = async (AppliedJobsID: number) => {
    const queryString = `
      SELECT * from AppliedJobs where AppliedJobsID=?;`
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(queryString, [AppliedJobsID]);
    console.log("Output: " + JSON.stringify(row))
    return row[0]
}

