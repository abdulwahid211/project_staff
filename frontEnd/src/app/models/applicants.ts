import { last } from "rxjs";

export class Applicants {
    public ApplicantID: number;
    public LastName: string;
    public FirstName: string;
    public Address: string;
    public City: string;
    public Postcode: string;
    public Email: string;
    public Password: string;

constructor(applicationID: number, lastName:string, firstName:string, address:string, city:string, postcode:string, email:string, password:string){
this.ApplicantID =applicationID;
this.LastName = lastName;
this.FirstName = firstName
this.Address = address;
this.City = city;
this.Postcode = postcode
this.Email = email
this.Password = password
}



}