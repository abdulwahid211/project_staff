export class Employer {
  public employerID: number;
  public name: string;
  public address: string;
  public city: string;
  public postcode: string;
  public email: string;
  public password: string;

  constructor(
    applicationID: number,
    name: string,
    address: string,
    city: string,
    postcode: string,
    email: string,
    password: string,
  ) {
    this.employerID = applicationID;
    this.name = name;
    this.address = address;
    this.city = city;
    this.postcode = postcode;
    this.email = email;
    this.password = password;
  }
}
