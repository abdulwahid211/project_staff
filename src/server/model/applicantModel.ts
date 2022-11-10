import {Db} from '../db/sql/dbConfig';
import {PasswordHash, ComparePassword} from '../util/passwordUtil';
import {AuthenticateToken} from '../util/tokenMethods';
import {SendEmail} from '../email/senderEmail';

export class Applicants {
  public ApplicantID!: number;
  public LastName!: string;
  public FirstName!: string;
  public Telephone!: string;
  public City!: string;
  public Email!: string;
  public Password!: string;
}

export const CreateApplicant = async (object: Applicants) => {
  const CreateQueryString =
    'INSERT INTO Applicants (LastName, FirstName, Email, Password, Telephone, City) VALUES (?,?,?,?,?,?)';
  const SecuredPassword = await PasswordHash(object.Password);
  Db.query(
    CreateQueryString,
    [
      object.FirstName,
      object.LastName,
      object.Email,
      SecuredPassword,
      object.Telephone,
      object.City,
    ],
    (err, results) => {
      if (err) console.log(err);
      if (results) {
        SendEmail(
          'abdulwahid211@gmail.com',
          object.Email,
          'Thank you for joining LandSea Stuffing',
          'TYUI OPI',
          '<p>Your credentials from LandSea Stuffing</p><p>Your username: ' +
            object.Email +
            ' </p><p>Your password: ' +
            object.Password +
            '</p>',
        );
      }
    },
  );

  const FindApplicantsQueryString = `
    SELECT * from Applicants where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindApplicantsQueryString, [
    object.Email,
  ]);
  return row[0].Email === object.Email;
};

export const UpdateApplicant = async (object: Applicants, req: any) => {
  AuthenticateToken(req);
  const UpdateQueryString =
    'Update Applicants set FirstName=?,LastName=?,Password=?,Email=?,Telephone=?, City=? where Email=?;';
  const SecuredPassword = await PasswordHash(object.Password);
  Db.query(
    UpdateQueryString,
    [
      object.FirstName,
      object.LastName,
      SecuredPassword,
      object.Email,
      object.Telephone,
      object.City,
      object.Email,
    ],
    (err, results) => {
      if (err) console.log(err);
    },
  );
  const FindApplicantsQueryString = `
    SELECT * from Applicants where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindApplicantsQueryString, [
    object.Email,
  ]);
  return row[0];
};

export const DeleteApplicant = async (email: string, req: any) => {
  AuthenticateToken(req);
  const CreateQueryString = 'Delete from Applicants where Email=?;';
  Db.query(CreateQueryString, [email], (err, results) => {
    if (err) console.log(err);
  });
  const FindApplicantsQueryString = `
    SELECT * from Applicants where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindApplicantsQueryString, [email]);
  if (row[0] == undefined) {
    return true;
  } else {
    return false;
  }
};

export const GetAllApplicants = async (req: any) => {
  AuthenticateToken(req);
  const queryString = `
      SELECT * from Applicants;`;
  const promisePool = Db.promise();
  const [rows] = await promisePool.execute(queryString);
  console.log(JSON.stringify(rows));
  return rows;
};

export const GetApplicant = async (email: string, req: any) => {
  AuthenticateToken(req);
  const queryString = `
      SELECT * from Applicants where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(queryString, [email]);
  console.log('Output: ' + JSON.stringify(row));
  return row[0];
};

export const GetApplicantAppliedJobs = async (employerId: Number, req: any) => {
  // AuthenticateToken(req);
  const queryString = `
  Select V.VacancyID as VacancyID, V.Title as JobTitle, A.ApplicantID, A.FirstName, A.LastName, A.Telephone, A.City, A.Email from applicants AS A inner join vacancies AS V  inner join appliedJobs AS AJ inner join employer as EM on
  V.EmployerId = EM.EmployerId and AJ.ApplicantID = A.ApplicantID and   AJ.VacancyID = V.VacancyID  where EM.EmployerID = ? order by A.ApplicantID ASC;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(queryString, [employerId]);
  console.log('Output: ' + JSON.stringify(row));
  return row;
};

export const UploadCV = async fileObject => {
  const InsertFileTable =
    'INSERT INTO CV (Email, Filename, Uploaded, File, Type, Size) VALUES (?,?,?,?,?,?)';

  if (fileObject) {
    const promisePool = Db.promise();
    const [row] = await promisePool.execute(InsertFileTable, [
      fileObject.Email,
      fileObject.Filename,
      fileObject.Created,
      fileObject.File,
      fileObject.Type,
      fileObject.Size,
    ]);
    console.log('Output: ' + JSON.stringify(row));
    return true;
  } else {
    return false;
  }
};

export const DeleteCV = async (email: string, req: any) => {
  AuthenticateToken(req);
  const CreateQueryString = 'Delete from CV where Email=?;';
  Db.query(CreateQueryString, [email], (err, results) => {
    if (err) console.log(err);
  });
  const FindCVQueryString = `
    SELECT * from CV where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindCVQueryString, [email]);
  if (row[0] == undefined) {
    return true;
  } else {
    return false;
  }
};

export const DownloadCV = async (email: string, req: any) => {
  AuthenticateToken(req);
  console.log('Help ' + email);
  const queryString = `
      SELECT * from CV where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(queryString, [email]);
  console.log('Output: 1 ' + JSON.stringify(row));
  return row[0];
};
