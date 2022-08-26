import {Db} from '../db/sql/dbConfig';

export class AppliedJobs {
  public AppliedJobsID!: number;
  public ApplicantID!: number;
  public VacancyID!: number;
}

export const CreateAppliedJobs = async (object: AppliedJobs) => {
  const CreateQueryString =
    'INSERT INTO AppliedJobs (ApplicantID, VacancyID) VALUES (?,?)';
  Db.query(
    CreateQueryString,
    [object.ApplicantID, object.VacancyID],
    (err, results) => {
      if (err) {
        console.log(err);
      }
    },
  );

  const FindAppliedJobsQueryString = `
    SELECT * from AppliedJobs where ApplicantID=? and VacancyID=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindAppliedJobsQueryString, [
    object.ApplicantID,
    object.VacancyID,
  ]);
  console.log(row[0].ApplicantID == object.ApplicantID);
  return row[0].ApplicantID == object.ApplicantID;
};

export const DeleteAppliedJobs = async (AppliedJobs: number) => {
  const CreateQueryString = 'Delete from AppliedJobs where AppliedJobsID=?;';
  Db.query(CreateQueryString, [AppliedJobs], (err, results) => {
    if (err) console.log(err);
  });
  const FindAppliedJobsQueryString = `
    SELECT * from AppliedJobs where AppliedJobsID=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindAppliedJobsQueryString, [
    AppliedJobs,
  ]);
  if (row[0] == undefined) {
    return true;
  } else {
    return false;
  }
};

export const GetAllAppliedJobs = async () => {
  const queryString = `
      SELECT * from AppliedJobs;`;
  const promisePool = Db.promise();
  const [rows] = await promisePool.execute(queryString);
  console.log(JSON.stringify(rows));
  return rows;
};

export const GetAppliedJob = async (AppliedJobsID: number) => {
  const queryString = `
      SELECT * from AppliedJobs where AppliedJobsID=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(queryString, [AppliedJobsID]);
  console.log('Output: ' + JSON.stringify(row));
  return row[0];
};

export const VerifyAlreadyAppliedJob = async (ApplicantID, VacancyID) => {
  const queryString = `
          SELECT * from AppliedJobs where ApplicantID=? and VacancyID=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(queryString, [
    ApplicantID,
    VacancyID,
  ]);

  if (row[0] != undefined) {
    return row[0].ApplicantID == ApplicantID && row[0].VacancyID == VacancyID;
  }

  return false;
};
