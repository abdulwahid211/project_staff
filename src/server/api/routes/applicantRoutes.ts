import { Router, Request, Response } from 'express'
import * as applicantsController from '../controllers/applicantController'
import { GetAllFilters } from '../../db/dal/types'
import { Applicants, ApplicantInput } from '../../model/applicant.model';

const applicantsRouter = Router()

// get all applicants 
applicantsRouter.get('/', async (req: Request, res: Response) => {
    const filters: GetAllFilters = req.query
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


applicantsRouter.put('/:id', async (req: Request, res: Response) => {
    const applicants: Applicants = req.body;
    const applicantsId = Number(req.params.id);
    var updatedApplicants = await applicantsController.updateApplicants(applicantsId, applicants);
    return res.status(200).send(updatedApplicants);
})


applicantsRouter.delete('/:id', async (req: Request, res: Response) => {
    const applicantsId = Number(req.params.id);
    var deleteApplicant = await applicantsController.deleteApplicant(applicantsId);
    return res.status(200).send(deleteApplicant);
})


applicantsRouter.post('/register', async (req: Request, res: Response) => {
   
    const applicant: ApplicantInput = req.body;
    try {

        const existedUser = await applicantsController.findByEmail(applicant.Email);

        if (existedUser) {
            res.send("User Already exists");
        } else {

            var newApplicant = await applicantsController.createApplicant(applicant)
            return res.status(200).send(newApplicant)

        }

    }
    catch (err) {
        console.log("Error");
        res.status(500).send(err.log)
    }
})

export default applicantsRouter