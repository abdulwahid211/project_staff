import * as express from 'express';
import apiRouter from './routes';
import dbInit from './db/init';
dbInit();
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000"
};
const app = express();

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;

try{
  app.listen(port, () => console.log(`Server listening on port: ${port}`));
} catch(error){
  console.log('Server Error: ${error.message}');
}
