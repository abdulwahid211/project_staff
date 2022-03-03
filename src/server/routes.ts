import * as express from 'express';
import applicantsRouter from './api/routes/Applicants';

const routers = express.Router();

// router.get('/api/hello', (req, res, next) => {
//   sql.query("SELECT * FROM Applicants;",  (err:any, result:any[]) => {
//           if (err) throw err;
//           res.json(result);
//           console.log(result);
//         });
// });

routers.use('/apple', applicantsRouter)


routers.get('/api/hena', (req, res, next) => {
    res.json('Ms Hena Aktar');
});


routers.get('/api/abzy', (req, res, next) => {
    res.json('Abzy was here!');
    next()
});

export default routers