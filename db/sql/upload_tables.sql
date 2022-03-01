
CREATE TABLE Applicants (
    ApplicantID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

CREATE TABLE Admin (
    AdminID int,
    LastName varchar(255),
    FirstName varchar(255)
);

CREATE TABLE Vacancies (
    VacancyID int,
    Title varchar(255)
);

CREATE TABLE Companies (
    CompanyID int,
    Name varchar(255)
);

CREATE TABLE AppliedJobs (
    AppliedJobsID int,
    ApplicantID int,
    VacancyID int
);

INSERT INTO Applicants (ApplicantID, LastName, FirstName, City)
VALUES (25, 'Erichsen', 'Skagen 21', 'Mosko');