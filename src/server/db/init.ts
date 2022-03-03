import { Applicants } from "../model/applicant.model";

const dbInit = () => {
    Applicants.sync({ alter: false })
  }

  export default dbInit;

  