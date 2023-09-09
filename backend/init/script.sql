
CREATE TABLE Applicants (
    ApplicantID int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    Telephone varchar(255) NOT NULL,
    City varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    PRIMARY KEY (ApplicantID)
);


CREATE TABLE CV (
  Id int NOT NULL AUTO_INCREMENT,
  Email varchar(255) NOT NULL,
  Filename varchar(255) NOT NULL,
  Uploaded datetime NOT NULL,
  File LONGTEXT NOT NULL,
  Type varchar(255) NOT NULL,
  Size int NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE Admin (
    AdminID int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    PRIMARY KEY (AdminID)
);

CREATE TABLE Vacancies (
    VacancyID int NOT NULL AUTO_INCREMENT,
    Title varchar(255),
    Sector varchar(255),
    EmployerID int,
    Created datetime,
    Salary varchar(255),
    Location varchar(255),
    Contract  varchar(255),
    Description LONGTEXT NOT NULL,
    PRIMARY KEY (VacancyID),
    FOREIGN KEY (EmployerID) REFERENCES Employer(EmployerID)
);

CREATE TABLE Employer (
    EmployerID int NOT NULL AUTO_INCREMENT,
    Name varchar(255),
    Address varchar(255) NOT NULL,
    City varchar(255) NOT NULL,
    Postcode varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Telephone varchar(255) NOT NULL,
    PRIMARY KEY (EmployerID)
);

CREATE TABLE AppliedJobs (
    AppliedJobsID int NOT NULL AUTO_INCREMENT,
    ApplicantID int,
    VacancyID int,
    PRIMARY KEY (AppliedJobsID),
    UNIQUE  KEY uniq_id (ApplicantID,VacancyID)
);

-- INSERT INTO Applicants ( LastName, FirstName, Address, City, Postcode, Email, Password)
-- VALUES ( 'James', 'Robertson', 'Causeway', 'Manchester', 'EC1 ASD', 'ABDULK@GMAIL.COM', 'PASSWORD');

-- INSERT INTO Applicants ( LastName, FirstName, Address, City, Postcode, Email, Password)
-- VALUES ( 'Abdul', 'Wahid', 'Barking Causeway', 'London','EC9 ASD', 'absuhsuh@GMAIL.COM', 'PASSWORD123');

-- INSERT INTO Employer ( Name, Address, City, Postcode, Email, Telephone)
-- VALUES ( 'Next LTD', 'Peterbrough', 'London', 'E2 KIO', 'next@gmail.com', '0976654346676');

-- INSERT INTO Employer ( Name, Address, City, Postcode, Email, Telephone)
-- VALUES ( 'JD Sports', 'Peterbrough TYUS', 'London', 'E2 KIO', 'jd@gmail.com', '0976654346676');

INSERT INTO Admin ( LastName, FirstName, Email, Password)
VALUES ( 'Haider', 'Ali','ali', 'pokemon');

INSERT INTO Admin ( LastName, FirstName, Email, Password)
VALUES ( 'Roots', 'Ali','root', 'password');

-- INSERT INTO Vacancies ( Title, EmployerID, Created, Description, Salary,Location,Contract, Sector )
-- VALUES ( 'Surgeon', 2, '2022-11-14', 'Responsibilities of Surgeon:

-- Working across the service charge and rents team providing property accounting
-- Setting rent and service charge for general needs housing to supported housing
-- Calculating and inputting all rent charges in the system whilst supporting team to ensure all rents are set correctly and monitored.
-- Reconciling all property expenditure ensuring it is coded against correct properties so service charges are reflecting the expenditures for compliance
-- Carry out monthly variance reporting and supporting the service charge manager
-- Ideal candidate:

-- Experience working in service charge administration
-- Experience using housing management and financial systems
-- Knowledge of rent and service charge processes
-- Understanding of Landlord and Tenant legislation
-- Understanding of fixed and variable service charges','£105k to £129k','Peterborough','Permanent','Government');


-- INSERT INTO Vacancies ( Title, EmployerID, Created, Description, Salary,Location,Contract, Sector )
-- VALUES ( 'Qaulity Engineer', 2, '2022-09-14', 'Responsibilities of Qaulity Engineer:
-- Working across the service charge and rents team providing property accounting
-- Understanding of fixed and variable service charges','£10000 an hour','London','Permanent','Information Technology');

-- INSERT INTO Vacancies ( Title, EmployerID, Created, Description, Salary,Location,Contract, Sector )
-- VALUES ( 'Football Manager', 2, '2026-09-14', 'Responsibilities of Manager:
-- Working across the service charge and rents team providing property accounting
-- Understanding of fixed and variable service charges','£90,000-£99,0000','London','Permanent','Sports');

-- INSERT INTO AppliedJobs ( ApplicantID, VacancyID)
-- VALUES ( 1,1);


-- SELECT * from Vacancies inner join Employer where Vacancies.VacancyID=145 and Vacancies.EmployerID = Employer.EmployerID;

-- Select V.VacancyID as VacancyID, V.Title as JobTitle, A.ApplicantID, A.FirstName, A.LastName, A.Address, A.Postcode, A.City, A.Email from applicants AS A inner join vacancies AS V  inner join appliedJobs AS AJ inner join employer as EM on
-- V.EmployerId = EM.EmployerId and AJ.ApplicantID = A.ApplicantID and   AJ.VacancyID = V.VacancyID  where EM.EmployerID = 5 order by A.ApplicantID ASC;