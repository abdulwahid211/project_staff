export interface IApplicants {
    ApplicantID: number,
    LastName: string,
    FirstName: string,
    Address: string,
    City: string,
    Postcode: string,
    Email: string,
    Password:string 
}

export interface IEmployer {
    EmployerID: number,
    Name: string,
    Address: string,
    City: string,
    Postcode: string,
    Email: string,
    Password:string 
}

export interface IVacancies {
    VacancyID: number,
    Title: string,
    EmployerID: number,
    Created: Date,
    Description: string
}

export interface IAppliedJobs {
    AppliedJobsID: number,
    ApplicantID: number,
    VacancyID: number
}

export interface IAdmin {
    AdminID: number,
    LastName: string,
    FirstName: string,
    Email: string,
    Password: string
}