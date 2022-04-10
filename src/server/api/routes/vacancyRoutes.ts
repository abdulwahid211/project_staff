import { Router, Request, Response } from 'express'
import * as adminController from '../controllers/adminController'
import { GetAllFilters } from '../../db/dal/types'
import { Admin, AdminInput } from '../../model/admin.model';

const adminRouter = Router()

// get all admin 
adminRouter.get('/', async (req: Request, res: Response) => {
    const filters: GetAllFilters = req.query
    console.log(filters)
    const results = await adminController.getAll(filters)
    return res.status(200).send(results)

})

// get individual applicant by id  
adminRouter.get('/:id', async (req: Request, res: Response) => {
    const applicantId = Number(req.params.id)
    const results = await adminController.findById(applicantId)
    return res.status(200).send(results)
})


adminRouter.put('/:id', async (req: Request, res: Response) => {
    const admin: Admin = req.body;
    const adminId = Number(req.params.id);
    var updatedadmin = await adminController.updateAdmins(adminId, admin);
    return res.status(200).send(updatedadmin);
})


adminRouter.delete('/:id', async (req: Request, res: Response) => {
    const adminId = Number(req.params.id);
    var deleteApplicant = await adminController.deleteAdmin(adminId);
    return res.status(200).send(deleteApplicant);
})


adminRouter.post('/', async (req: Request, res: Response) => {
    const applicant: AdminInput = req.body;
    var newApplicant = await adminController.createAdmin(applicant)
    return res.status(200).send(newApplicant)
})

export default adminRouter