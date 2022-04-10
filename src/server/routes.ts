import * as express from 'express';
import applicantsRouter from './api/routes/applicantRoutes';
import employersRouter from './api/routes/employerRoutes';
import adminRouter from './api/routes/adminRoutes';
import appliedJobsRouter from './api/routes/appliedJobsRoutes';
import vacancyRoutes from './api/routes/vacancyRoutes';

const routers = express.Router();

routers.use('/applicants', applicantsRouter)
routers.use('/employers', employersRouter)
routers.use('/admin', adminRouter)
routers.use('/appliedJobs', appliedJobsRouter)
routers.use('/vacancy', vacancyRoutes)

routers.get('/api/hena', (req, res, next) => {
    res.json('Ms Hena Aktar');
});


routers.get('/api/abzy', (req, res, next) => {
    res.json('Abzy was here!');
    next()
});

export default routers