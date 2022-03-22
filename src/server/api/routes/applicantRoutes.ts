import { Router, Request, Response } from 'express'
import * as applicantsController from '../controllers/applicantController'
import { GetAllApplicantsFilters } from '../../db/dal/types'
import { Applicants, ApplicantInput } from '../../model/applicant.model';

const applicantsRouter = Router()

// get all applicants 
applicantsRouter.get('/', async (req: Request, res: Response) => {
    const filters: GetAllApplicantsFilters = req.query
    console.log(filters)
    const results = await applicantsController.getAll(filters)
    return res.status(200).send(results)

})

// get individual applicant by id  
applicantsRouter.get('/:id', async (req: Request, res: Response) => {
    const applicantId = Number(req.params.id)
    const results = await applicantsController.findById(applicantId)
    return res.status(200).send(results)
})


applicantsRouter.put('/update/:id', async (req: Request, res:Response) => {
    console.log("yaaah");
    // update ingredient
    const applicants: Applicants = req.body;
    const applicantsId = Number(req.params.id);
    var updatedApplicants = await applicantsController.updateApplicants(applicantsId,applicants);
    return res.status(200).send(updatedApplicants);
})
// applicantsRouter.delete('/:id', () => {
//     // delete ingredient
// })
// applicantsRouter.post('/', () => {
//     // create ingredient

export default applicantsRouter