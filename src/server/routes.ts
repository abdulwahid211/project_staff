import * as express from 'express';
const sql = require("../../db/sql/db.js");



const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    sql.connect(function(err,connection) {
        if (err) throw err;
        connection.query("SELECT * FROM Applicants = 'Park Lane 38'", function (err, result) {
          if (err) throw err;
          res.json('Result:'+result);
          console.log(result);
        });
      });
});


router.get('/api/hena', (req, res, next) => {
    res.json('Ms Hena Aktar');
});


router.get('/api/abzy', (req, res, next) => {
    res.json('Abzy was here!');
});

export default router;