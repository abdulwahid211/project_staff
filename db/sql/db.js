const mysql = require("mysql");
const dbConfig = require("./db.config");
// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port:3306,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
// open the MySQL connection
connection.connect(error => {
  if (error) { console.log("Error output: " +error);}
  else{
    console.log("Successfully connected to the database.");
  }
});
module.exports = connection;