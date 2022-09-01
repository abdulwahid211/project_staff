import {Db} from '../db/sql/dbConfig';
import {PasswordHash, ComparePassword} from '../util/passwordUtil';
import {AuthenticateToken} from '../util/tokenMethods';

export class Applicants {
  public ApplicantID!: number;
  public LastName!: string;
  public FirstName!: string;
  public Address!: string;
  public City!: string;
  public Postcode!: string;
  public Email!: string;
  public Password!: string;
}

export const CreateApplicant = async (object: Applicants) => {
  const CreateQueryString =
    'INSERT INTO Applicants (LastName, FirstName, Email, Password, Address, City, Postcode) VALUES (?,?,?,?,?,?,?)';
  const SecuredPassword = await PasswordHash(object.Password);
  Db.query(
    CreateQueryString,
    [
      object.FirstName,
      object.LastName,
      object.Email,
      SecuredPassword,
      object.Address,
      object.City,
      object.Postcode,
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
  return row[0].Email === object.Email;
};

export const UpdateApplicant = async (object: Applicants, req: any) => {
  AuthenticateToken(req);
  const UpdateQueryString =
    'Update Applicants set FirstName=?,LastName=?,Password=?,Email=?,Address=?, City=?, Postcode=? where Email=?;';
  const SecuredPassword = await PasswordHash(object.Password);
  Db.query(
    UpdateQueryString,
    [
      object.FirstName,
      object.LastName,
      SecuredPassword,
      object.Email,
      object.Address,
      object.City,
      object.Postcode,
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
