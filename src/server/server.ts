import * as express from 'express';
import { ApolloServer } from 'apollo-server';
import { typeAdmins, resolversAdmins } from './graphql/admin';
import {typeApplicants,resolversApplicants} from './graphql/applicant'; 
import {typeEmployer,resolversEmployers} from './graphql/Employer'; 
import {typeAppliedJobs,resolversAppliedJobs} from './graphql/appliedJobs'; 
import {typeVacancies,resolversVacancies} from './graphql/vacancies'; 
import { Db } from '../server/db/sql/dbConfig'
import * as dotenv from "dotenv";
Db.connect();
dotenv.config();
const port = process.env.PORT;


const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:"+port
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const server = new ApolloServer({
  typeDefs: [typeEmployer,typeApplicants, typeAdmins,typeAppliedJobs,typeVacancies],
  resolvers:[resolversEmployers,resolversApplicants, resolversAdmins,resolversAppliedJobs,resolversVacancies]
});

setupApp();

async function setupApp() {
  try{
    server.listen(port, () => console.log(`Server listening on port: ${port}`));
  } catch(error){
    console.log('Server Error: ${error.message}');
  }
  
}



