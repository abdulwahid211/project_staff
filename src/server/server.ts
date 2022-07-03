import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';

import * as dotenv from "dotenv";
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
  modules: [],
})

server.applyMiddleware({ app })



try{
  app.listen(port, () => console.log(`Server listening on port: ${port}`));
} catch(error){
  console.log('Server Error: ${error.message}');
}
