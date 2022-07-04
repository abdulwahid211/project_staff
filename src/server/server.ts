import * as express from 'express';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/admin';
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
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});




// const server = new ApolloServer({
//   modules: [require('../server/GraphQL/admin')]
// })

setupApp();

async function setupApp() {
  try{
    server.listen(port, () => console.log(`Server listening on port: ${port}`));
  } catch(error){
    console.log('Server Error: ${error.message}');
  }
  
}



