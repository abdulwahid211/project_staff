import * as express from 'express';
import applicantsRouter from './api/routes/applicantRoutes';
import employersRouter from './api/routes/employerRoutes';
import adminRouter from './api/routes/adminRoutes';
import appliedJobsRouter from './api/routes/appliedJobsRoutes';
import vacancyRoutes from './api/routes/vacancyRoutes';
const routers = express.Router();
const jwt = require('jsonwebtoken');

// const output = require('crypto').randomBytes(64).toString('hex');

 require('crypto').randomBytes(64).toString('hex')
// '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

routers.use('/applicants', applicantsRouter)
routers.use('/employers', employersRouter)
routers.use('/admin', adminRouter)
routers.use('/appliedJobs', appliedJobsRouter)
routers.use('/vacancy', vacancyRoutes)

routers.get('/api/hena', (req, res, next) => {
    res.json('Ms Hena Aktar');
});


routers.get('/abzy', (req, res, next) => {
    res.json("output");
    next()
});

export default routers