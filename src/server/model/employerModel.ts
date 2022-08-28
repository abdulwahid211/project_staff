import {Db} from '../db/sql/dbConfig';
import {PasswordHash, ComparePassword} from '../util/passwordUtil';
export class Employer {
  public EmployerID!: number;
  public Name!: string;
  public Address!: string;
  public City!: string;
  public Postcode!: string;
  public Email!: string;
  public Password!: string;
}

export const CreateEmployer = async (object: Employer) => {
  const CreateQueryString =
    'INSERT INTO employer (Name, Email, Password, Address, City, Postcode) VALUES (?,?,?,?,?,?)';
  const SecuredPassword = await PasswordHash(object.Password);
  Db.query(
    CreateQueryString,
    [
      object.Name,
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

  const FindEmployerQueryString = `
    SELECT * from Employer where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindEmployerQueryString, [
    object.Email,
  ]);
  return row[0].Email === object.Email;
};

export const UpdateEmployer = async (object: Employer) => {
  const UpdateQueryString =
    'Update Employer set Name=?,Password=?,Email=?,Address=?, City=?, Postcode=? where Email=?;';
  const SecuredPassword = await PasswordHash(object.Password);
  Db.query(
    UpdateQueryString,
    [
      object.Name,
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
  const FindEmployerQueryString = `
    SELECT * from Employer where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindEmployerQueryString, [
    object.Email,
  ]);
  return row[0];
};

export const DeleteEmployer = async (email: string) => {
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

export const GetAllEmployers = async () => {
  const queryString = `
      SELECT * from Employer;`;
  const promisePool = Db.promise();
  const [rows] = await promisePool.execute(queryString);
  console.log(JSON.stringify(rows));
  return rows;
};

export const GetEmployer = async (email: string) => {
  const queryString = `
      SELECT * from Employer where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(queryString, [email]);
  console.log('Output: ' + JSON.stringify(row));
  return row[0];
};
