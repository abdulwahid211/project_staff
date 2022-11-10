export class Applicants {
  public ApplicantID: number;
  public LastName: string;
  public FirstName: string;
  public City: string;
  public Telephone: string;
  public Email: string;
  public Password: string;

  constructor(
    applicationID: number,
    lastName: string,
    firstName: string,
    city: string,
    telephone: string,
    email: string,
    password: string,
  ) {
    this.ApplicantID = applicationID;
    this.LastName = lastName;
    this.FirstName = firstName;
    this.City = city;
    this.Telephone = telephone;
    this.Email = email;
    this.Password = password;
  }
}
