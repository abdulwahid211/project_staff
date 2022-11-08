import {gql} from 'apollo-angular';

export const APPLICANT_LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    applicantLogin(Email: $email, Password: $password) {
      token
      id
    }
  }
`;

export const ADMIN_LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    adminLogin(Email: $email, Password: $password) {
      token
      id
    }
  }
`;

export const GET_APPLICANT_PROFILE = gql`
  query Query($email: String!) {
    applicant(Email: $email) {
      ApplicantID
      FirstName
      LastName
      telephone
      City
      Postcode
      Email
      Password
    }
  }
`;

export const CREATE_APPLICANT_PROFILE = gql`
  mutation Mutation(
    $lastName: String!
    $firstName: String!
    $email: String!
    $password: String!
    $telephone: String!
    $city: String!
  ) {
    createApplicant(
      LastName: $lastName
      FirstName: $firstName
      Email: $email
      Password: $password
      Telephone: $telephone
      City: $city
    )
  }
`;

export const CREATE_ADMIN_PROFILE = gql`
  mutation Mutation(
    $lastName: String!
    $firstName: String!
    $email: String!
    $password: String!
  ) {
    createAdmin(
      LastName: $lastName
      FirstName: $firstName
      Email: $email
      Password: $password
    )
  }
`;

export const CREATE_EMPLOYER_PROFILE = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $password: String!
    $telephone: String!
    $address: String!
    $city: String!
    $postcode: String!
  ) {
    createEmployer(
      Name: $name
      Email: $email
      Password: $password
      Address: $address
      City: $city
      Postcode: $postcode
    )
  }
`;

export const CREATE_VACANCY_PROFILE = gql`
  mutation Mutation(
    $employerId: ID!
    $title: String!
    $description: String!
    $created: Date!
  ) {
    createVacancies(
      EmployerID: $employerId
      Title: $title
      Description: $description
      Created: $created
    )
  }
`;

export const GET_VACANCY_PROFILE = gql`
  query Vacancy($vacancyId: ID!) {
    Vacancy(VacancyID: $vacancyId) {
      VacancyID
      EmployerID
      Title
      Description
      Created
      Sector
      Salary
      Location
      Contract
    }
  }
`;

export const GET_VACANCIES = gql`
  query Vacancies {
    Vacancies {
      VacancyID
      EmployerID
      Title
      Description
      Created
      Sector
      Salary
      Location
      Contract
    }
  }
`;

export const CREATE_APPLIED_JOBS = gql`
  mutation Mutation($applicantId: ID!, $vacancyId: ID!) {
    createAppliedJobs(ApplicantID: $applicantId, VacancyID: $vacancyId)
  }
`;

export const CHECK_APPLIED_JOBS = gql`
  query Query($applicantId: ID!, $vacancyId: ID!) {
    verifyAlreadyAppliedJob(ApplicantID: $applicantId, VacancyID: $vacancyId)
  }
`;

export const EMPLOYER_LOGIN = gql`
  mutation EmployerLogin($email: String!, $password: String!) {
    employerLogin(Email: $email, Password: $password) {
      token
      id
    }
  }
`;

export const GET_EMPLOYER_PROFILE = gql`
  query Employer($email: String!) {
    Employer(Email: $email) {
      EmployerID
      Name
      telephone
      City
      Postcode
      Email
      Password
    }
  }
`;

export const GET_ALL_APPLICANTS = gql`
  query Applicants {
    applicants {
      ApplicantID
      LastName
      FirstName
      Telephone
      City
      Postcode
      Email
    }
  }
`;

export const GET_ALL_EMPLOYERS = gql`
  query Employers {
    Employers {
      EmployerID
      Name
      Telephone
      Address
      City
      Postcode
      Email
      Password
    }
  }
`;

export const GET_ALL_ADMINS = gql`
  query Admins {
    admins {
      AdminID
      LastName
      FirstName
      Email
      Password
    }
  }
`;

export const DELETE_ALL_ADMIN = gql`
  mutation DeleteAdmin($email: String!) {
    deleteAdmin(Email: $email)
  }
`;

export const DELETE_ALL_APPLICANT = gql`
  mutation DeleteApplicant($email: String!) {
    deleteApplicant(Email: $email)
  }
`;

export const DELETE_ALL_EMPLOYER = gql`
  mutation DeleteEmployer($email: String!) {
    deleteEmployer(Email: $email)
  }
`;

export const GET_ALL_APPLIED_APPLICANTS = gql`
  query ApplicantAppliedJobs($employerId: ID) {
    applicantAppliedJobs(employerId: $employerId) {
      VacancyID
      JobTitle
      ApplicantID
      LastName
      FirstName
      City
      Telephone
      Email
    }
  }
`;

export const UPLOAD_CV = gql`
  mutation UploadCV(
    $file: Upload!
    $email: String!
    $filename: String!
    $created: Date!
    $type: String!
    $size: Int!
  ) {
    uploadCV(
      File: $file
      Email: $email
      Filename: $filename
      Created: $created
      Type: $type
      Size: $size
    )
  }
`;

export const DOWNLOAD_CV = gql`
  mutation Mutation($email: String) {
    downloadCV(Email: $email) {
      Id
      File
      Email
      Filename
      Uploaded
      Type
      Size
    }
  }
`;
