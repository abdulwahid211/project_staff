import {Db} from '../db/sql/dbConfig';
import {ComparePassword} from '../util/passwordUtil';
import {
  GenerateAccessToken,
  GenerateShortAccessToken,
} from '../util/tokenMethods';
import {SendEmail} from '../email/senderEmail';

export class UserLoginInput {
  public Email!: string;
  public Password!: string;
}

export const AdminLogin = async (object: UserLoginInput) => {
  const FindAdminQueryString = `
    SELECT * from Admin where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindAdminQueryString, [object.Email]);
  if (row[0]) {
    // const passwordResult = await ComparePassword(
    //   object.Password,
    //   row[0].Password,
    // );
    if (row[0].Email == object.Email) {
      return {token: GenerateAccessToken(row[0].Email), id: row[0].AdminID};
    }
    return {token: 'Incorrect Details'};
  } else {
    return {token: 'Not Found'};
  }
};

export const ApplicantLogin = async (object: UserLoginInput) => {
  const FindApplicantQueryString = `
    SELECT * from Applicants where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindApplicantQueryString, [
    object.Email,
  ]);
  if (row[0]) {
    const passwordResult = await ComparePassword(
      object.Password,
      row[0].Password,
    );
    if (row[0].Email == object.Email && passwordResult) {
      const Id = String(row[0].ApplicantID);
      console.log(Id);
      return {token: GenerateAccessToken(row[0].Email), id: row[0].ApplicantID};
    }
    return {token: 'Incorrect Details', id: '0'};
  } else {
    return {token: 'Not Found', id: '0'};
  }
};

export const ForgottenPasswordLogin = async (email: string) => {
  const FindApplicantPasswordString = `
    SELECT * from Applicants where Email=?;`;
  const promisePool = Db.promise();

  const [row] = await promisePool.execute(FindApplicantPasswordString, [email]);

  if (row != undefined) {
    var link =
      'http://localhost:4200/resetPassword?id=' +
      row[0].ApplicantID +
      '&token=' +
      GenerateShortAccessToken(row[0].Email);

    SendEmail(
      'abdulwahid211@gmail.com',
      email,
      'Forgetten Password - LandSea Stuffing',
      '',
      '<p>We notice that you have forgetten your password</p><p> Here is the <a href="' +
        link +
        '">link</a> to change it.</p>',
    );
    return {emailSent: 'true'};
  }
};

export const EmployerLogin = async (object: UserLoginInput) => {
  const FindEmployerQueryString = `
    SELECT * from Employer where Email=?;`;
  const promisePool = Db.promise();
  const [row] = await promisePool.execute(FindEmployerQueryString, [
    object.Email,
  ]);
  if (row[0]) {
    const passwordResult = await ComparePassword(
      object.Password,
      row[0].Password,
    );
    if (row[0].Email == object.Email && passwordResult) {
      const Id = String(row[0].EmployerID);
      console.log(Id);
      return {token: GenerateAccessToken(row[0].Email), id: row[0].EmployerID};
    }
    return {token: 'Incorrect Details', id: '0'};
  } else {
    return {token: 'Not Found', id: '0'};
  }
};
