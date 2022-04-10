import { Router, Request, Response } from 'express'
import * as employerController from '../controllers/employerController'
import { GetAllFilters } from '../../db/dal/types'
import { Employer, EmployerInput } from '../../model/employer.model';

const employerRouter = Router()

// get all Employer 
employerRouter.get('/', async (req: Request, res: Response) => {
    const filters: GetAllFilters = req.query
    console.log(filters)
    const results = await employerController.getAll(filters)
    return res.status(200).send(results)

})

// get individual applicant by id  
employerRouter.get('/:id', async (req: Request, res: Response) => {
    const applicantId = Number(req.params.id)
    const results = await employerController.findById(applicantId)
    return res.status(200).send(results)
})


employerRouter.put('/:id', async (req: Request, res: Response) => {
    const Employer: Employer = req.body;
    const employerId = Number(req.params.id);
    var updatedemployer = await employerController.updateEmployer(employerId, Employer);
    return res.status(200).send(updatedemployer);
})


employerRouter.delete('/:id', async (req: Request, res: Response) => {
    const employerId = Number(req.params.id);
    var deleteApplicant = await employerController.deleteEmployer(employerId);
    return res.status(200).send(deleteApplicant);
})


employerRouter.post('/', async (req: Request, res: Response) => {
    const applicant: EmployerInput = req.body;
    var newApplicant = await employerController.createEmployer(applicant)
    return res.status(200).send(newApplicant)
})

export default employerRouter