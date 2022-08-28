export class Employer {
  public EmployerID: number;
  public Name: string;
  public Address: string;
  public City: string;
  public Postcode: string;
  public Email: string;
  public Password: string;

  constructor(
    applicationID: number,
    name: string,
    address: string,
    city: string,
    postcode: string,
    email: string,
    password: string,
  ) {
    this.EmployerID = applicationID;
    this.Name = name;
    this.Address = address;
    this.City = city;
    this.Postcode = postcode;
    this.Email = email;
    this.Password = password;
  }
}
