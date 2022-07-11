
CREATE TABLE Applicants (
    ApplicantID int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    Address varchar(255) NOT NULL,
    Postcode varchar(255) NOT NULL,
    City varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    PRIMARY KEY (ApplicantID)
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
    EmployerID int,
    Created datetime,
    Description varchar(255),
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
    Password varchar(255) NOT NULL,
    PRIMARY KEY (EmployerID)
);

CREATE TABLE AppliedJobs (
    AppliedJobsID int NOT NULL AUTO_INCREMENT,
    ApplicantID int,
    VacancyID int,
    PRIMARY KEY (AppliedJobsID),
    FOREIGN KEY (ApplicantID) REFERENCES Applicants(ApplicantID),
    FOREIGN KEY (VacancyID) REFERENCES Vacancies(VacancyID)
);

INSERT INTO Applicants ( LastName, FirstName, Address, City, Postcode, Email, Password)
VALUES ( 'James', 'Robertson', 'Causeway', 'Manchester', 'EC1 ASD', 'ABDULK@GMAIL.COM', 'PASSWORD');

INSERT INTO Applicants ( LastName, FirstName, Address, City, Postcode, Email, Password)
VALUES ( 'Abdul', 'Wahid', 'Barking Causeway', 'London','EC9 ASD', 'absuhsuh@GMAIL.COM', 'PASSWORD123');

INSERT INTO Employer ( Name, Address, City, Postcode, Email, Password)
VALUES ( 'Apple', 'Peterbrough', 'London', 'E2 KIO', 'scadcsdfvf@gmail.com', 'PASSWORD');

INSERT INTO Admin ( LastName, FirstName, Email, Password)
VALUES ( 'James', 'Robertson','ABDULK@GMAIL.COM', 'PASSWORD');

INSERT INTO Vacancies ( Title, EmployerID, Created, Description)
VALUES ( 'Apple', 2, '2020-09-14', 'bla bla sacndnvosdv doainvdivd indcodv');

INSERT INTO AppliedJobs ( ApplicantID, VacancyID)
VALUES ( 1,1);