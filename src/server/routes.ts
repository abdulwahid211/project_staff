import * as express from 'express';
import applicantsRouter from './api/routes/applicantRoutes';
import employersRouter from './api/routes/employerRoutes';
import adminRouter from './api/routes/adminRoutes';
import appliedJobsRouter from './api/routes/appliedJobsRoutes';
import vacancyRoutes from './api/routes/vacancyRoutes';
const routers = express.Router();

routers.use('/applicants', applicantsRouter)
routers.use('/admin', adminRouter)
routers.use('/employers', employersRouter)
routers.use('/appliedJobs', appliedJobsRouter)
routers.use('/vacancy', vacancyRoutes)

export default routers