import * as express from 'express';
import applicantsRouter from './api/routes/applicantRoutes';
import employerssRouter from './api/routes/employerRoutes';
import adminRouter from './api/routes/adminRoutes';
const routers = express.Router();

routers.use('/applicants', applicantsRouter)
routers.use('/employers', employerssRouter)
routers.use('/adminRouter', adminRouter)


routers.get('/api/hena', (req, res, next) => {
    res.json('Ms Hena Aktar');
});


routers.get('/api/abzy', (req, res, next) => {
    res.json('Abzy was here!');
    next()
});

export default routers