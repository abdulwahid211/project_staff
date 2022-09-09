import * as express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {
  typeAuthUserInput,
  resolversAuthentication,
} from './graphql/authenticationts';
import {createServer} from 'http';
import {typeAdmins, resolversAdmins} from './graphql/admin';
import {typeApplicants, resolversApplicants} from './graphql/applicant';
import {typeEmployer, resolversEmployers} from './graphql/Employer';
import {typeAppliedJobs, resolversAppliedJobs} from './graphql/appliedJobs';
import {typeVacancies, resolversVacancies} from './graphql/vacancies';
import {Db} from '../server/db/sql/dbConfig';
import * as dotenv from 'dotenv';
import {graphqlHTTP} from 'express-graphql';
import {GraphQLUpload, graphqlUploadExpress} from 'graphql-upload';

Db.connect();
dotenv.config();
const port = process.env.PORT;

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:' + port + `/graphql`,
};

const server = new ApolloServer({
  typeDefs: [
    typeAuthUserInput,
    typeEmployer,
    typeApplicants,
    typeAdmins,
    typeAppliedJobs,
    typeVacancies,
  ],
  resolvers: [
    resolversEmployers,
    resolversApplicants,
    resolversAdmins,
    resolversAppliedJobs,
    resolversVacancies,
    resolversAuthentication,
  ],
  context: req => ({
    req,
  }),
});

setupApp();

async function setupApp() {
  try {
    const app = express();
    const httpServer = createServer(app);

    await server.start();

    // app.use(cors(corsOptions));
    // app.use(express.json());
    // app.use(express.urlencoded({extended: true}));
    // app.use(express.static('public'));
    app.use(graphqlUploadExpress());
    app.use(express.json({limit: '50mb'}));
    app.use(
      express.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
      }),
    );
    server.applyMiddleware({app, path: `/graphql`});

    httpServer.listen(port, () =>
      console.log(`Server listening on port: ${port}`),
    );
  } catch (error) {
    console.log('Server Error: ${error.message}');
  }
}
