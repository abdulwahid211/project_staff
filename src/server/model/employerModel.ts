import {Db} from '../db/sql/dbConfig';
import {AuthenticateToken} from '../util/tokenMethods';
export class Employer {
  public EmployerID!: number;
  public Name!: string;
  public Address!: string;
  public City!: string;
  public Postcode!: string;
  public Email!: string;
  public Telephone!: string;
}

export const CreateEmployer = async (object: Employer, req: any) => {
  AuthenticateToken(req);
  const CreateQueryString =
    'INSERT INTO employer (Name, Email, Telephone, Address, City, Postcode) VALUES (?,?,?,?,?,?)';
  Db.query(
    CreateQueryString,
    [
      object.Name,
      object.Email,
      object.Telephone,
      object.Address,
      object.City,
      object.Postcode,
    ],
    (err, results) => {
      if (err) console.log(err);
    },
  );

  const FindEmployerQueryString = `
    SELECT * from Employer where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindEmployerQueryString, [
    object.Email,
  ]);
  return row[0].Email === object.Email;
};

export const UpdateEmployer = async (object: Employer, req: any) => {
  AuthenticateToken(req);
  const UpdateQueryString =
    'Update Employer set Name=?,Telephone=?,Email=?,Address=?, City=?, Postcode=? where Email=?;';
  Db.query(
    UpdateQueryString,
    [
      object.Name,
      object.Telephone,
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
  const FindEmployerQueryString = `
    SELECT * from Employer where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindEmployerQueryString, [
    object.Email,
  ]);
  return row[0];
};

export const DeleteEmployer = async (email: string, req: any) => {
  AuthenticateToken(req);
  console.log('Output: ' + email);
  const CreateQueryString = 'Delete from Employer where Email=?;';
  Db.query(CreateQueryString, [email], (err, results) => {
    if (err) console.log(err);
  });
  const FindEmployerQueryString = `
    SELECT * from Employer where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindEmployerQueryString, [email]);
  if (row[0] == undefined) {
    return true;
  } else {
    return false;
  }
};

export const GetAllEmployers = async (req: any) => {
  AuthenticateToken(req);
  const queryString = `
      SELECT * from Employer;`;
  const promisePool = Db.promise();
  const [rows] = await promisePool.execute(queryString);
  console.log(JSON.stringify(rows));
  return rows;
};

export const GetEmployer = async (email: string, req: any) => {
  AuthenticateToken(req);
  const queryString = `
      SELECT * from Employer where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(queryString, [email]);
  console.log('Output: ' + JSON.stringify(row));
  return row[0];
};
