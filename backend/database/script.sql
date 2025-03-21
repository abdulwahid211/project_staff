-- Applicants Table
CREATE TABLE Applicants (
    ApplicantID INT AUTO_INCREMENT PRIMARY KEY,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    Telephone VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

-- CV Table
CREATE TABLE CV (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Filename VARCHAR(255) NOT NULL,
    Uploaded DATETIME NOT NULL,
    File LONGTEXT NOT NULL,
    Type VARCHAR(255) NOT NULL,
    Size INT NOT NULL
);

-- Admin Table
CREATE TABLE Admin (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

-- Employer Table
CREATE TABLE Employer (
    EmployerID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    Postcode VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Telephone VARCHAR(255) NOT NULL
);

-- Vacancies Table
CREATE TABLE Vacancies (
    VacancyID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255),
    Sector VARCHAR(255),
    EmployerID INT,
    Created DATETIME,
    Salary VARCHAR(255),
    Location VARCHAR(255),
    Contract VARCHAR(255),
    Description LONGTEXT NOT NULL,
    FOREIGN KEY (EmployerID) REFERENCES Employer(EmployerID)
);

-- AppliedJobs Table
CREATE TABLE AppliedJobs (
    AppliedJobsID INT AUTO_INCREMENT PRIMARY KEY,
    ApplicantID INT,
    VacancyID INT,
    UNIQUE KEY uniq_id (ApplicantID, VacancyID),
    FOREIGN KEY (ApplicantID) REFERENCES Applicants(ApplicantID),
    FOREIGN KEY (VacancyID) REFERENCES Vacancies(VacancyID)
);


-- Insert Data into Applicants Table
INSERT INTO Applicants (LastName, FirstName, City, Email, Password, Telephone)
VALUES ('James', 'Robertson', 'Manchester', 'ABDULK@GMAIL.COM', 'PASSWORD', '1234567890');

INSERT INTO Applicants (LastName, FirstName, City, Email, Password, Telephone)
VALUES ('Abdul', 'Wahid', 'London', 'absuhsuh@GMAIL.COM', 'PASSWORD123', '0987654321');

-- Insert Data into Employer Table
INSERT INTO Employer (Name, Address, City, Postcode, Email, Telephone)
VALUES ('Next LTD', 'Peterborough', 'London', 'E2 KIO', 'next@gmail.com', '0976654346676');

INSERT INTO Employer (Name, Address, City, Postcode, Email, Telephone)
VALUES ('JD Sports', 'Peterborough TYUS', 'London', 'E2 KIO', 'jd@gmail.com', '0976654346676');

-- Insert Data into Admin Table
INSERT INTO Admin (LastName, FirstName, Email, Password)
VALUES ('Roots', 'Ali', 'root@gmail.com', 'password');

-- Insert Data into Vacancies Table
INSERT INTO Vacancies (Title, EmployerID, Created, Description, Salary, Location, Contract, Sector)
VALUES ('Surgeon', 2, '2022-11-14', 'Responsibilities of Surgeon: \n Working across the service charge and rents team providing property accounting\n Setting rent and service charge for general needs housing to supported housing\n Calculating and inputting all rent charges in the system whilst supporting team to ensure all rents are set correctly and monitored.\n Reconciling all property expenditure ensuring it is coded against correct properties so service charges are reflecting the expenditures for compliance\n Carry out monthly variance reporting and supporting the service charge manager\n Ideal candidate:\n Experience working in service charge administration\n Experience using housing management and financial systems\n Knowledge of rent and service charge processes\n Understanding of Landlord and Tenant legislation\n Understanding of fixed and variable service charges', '£105k to £129k', 'Peterborough', 'Permanent', 'Government');

INSERT INTO Vacancies (Title, EmployerID, Created, Description, Salary, Location, Contract, Sector)
VALUES ('Quality Engineer', 2, '2022-09-14', 'Responsibilities of Quality Engineer:\n Working across the service charge and rents team providing property accounting\n Understanding of fixed and variable service charges', '£10,000 an hour', 'London', 'Permanent', 'Information Technology');

INSERT INTO Vacancies (Title, EmployerID, Created, Description, Salary, Location, Contract, Sector)
VALUES ('Football Manager', 2, '2026-09-14', 'Responsibilities of Manager:\n Working across the service charge and rents team providing property accounting\n Understanding of fixed and variable service charges', '£90,000-£99,000', 'London', 'Permanent', 'Sports');

-- Insert Data into AppliedJobs Table
INSERT INTO AppliedJobs (ApplicantID, VacancyID)
VALUES (1, 1);

-- Example Queries
-- Get Vacancy Details with Employer Info
SELECT * FROM Vacancies 
INNER JOIN Employer ON Vacancies.EmployerID = Employer.EmployerID 
WHERE Vacancies.VacancyID = 145;

-- Get Applied Jobs with Applicant and Employer Info
SELECT V.VacancyID AS VacancyID, V.Title AS JobTitle, A.ApplicantID, A.FirstName, A.LastName, A.City, A.Email 
FROM Applicants AS A
INNER JOIN AppliedJobs AS AJ ON AJ.ApplicantID = A.ApplicantID
INNER JOIN Vacancies AS V ON AJ.VacancyID = V.VacancyID
INNER JOIN Employer AS EM ON V.EmployerID = EM.EmployerID
WHERE EM.EmployerID = 5 
ORDER BY A.ApplicantID ASC;
