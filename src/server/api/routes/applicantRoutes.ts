import { Router, Request, Response } from 'express'
import * as applicantsController from '../controllers/applicantController'
import { GetAllFilters } from '../../db/dal/types'
import { Applicants, ApplicantInput } from '../../model/applicant.model';
import { ComparePassword } from '../../util/passwordUtil';
import { generateAccessToken, authenticateToken } from '../../util/tokenMethods';

const applicantsRouter = Router()

// get all applicants 
applicantsRouter.get('/', authenticateToken, async (req: Request, res: Response) => {
    const filters: GetAllFilters = req.query
    console.log(filters)
    const results = await applicantsController.getAll(filters)
    return res.status(200).send(results)
})

// get individual applicant by id  
applicantsRouter.get('/:id', authenticateToken, async (req: Request, res: Response) => {
    const applicantId = Number(req.params.id)
    const results = await applicantsController.findById(applicantId)
    return res.status(200).send(results)
})


applicantsRouter.put('/:id', authenticateToken, async (req: Request, res: Response) => {
    const applicants: Applicants = req.body;
    const applicantsId = Number(req.params.id);
    var updatedApplicants = await applicantsController.updateApplicants(applicantsId, applicants);
    return res.status(200).send(updatedApplicants);
})


applicantsRouter.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    const applicantsId = Number(req.params.id);
    var deleteApplicant = await applicantsController.deleteApplicant(applicantsId);
    return res.status(200).send(deleteApplicant);
})


applicantsRouter.post('/register', async (req: Request, res: Response) => {

    const applicant: ApplicantInput = req.body;
    try {

        const existedUser = await applicantsController.findByEmail(applicant.Email);

        if (existedUser.Email.length > 0) {
            res.send("User Already Exists");
        } else {

            var newApplicantStatus = await applicantsController.createApplicant(applicant)
            return res.status(200).send("Success Applicant has been created " + newApplicantStatus)
        }

    }
    catch (err) {
        console.log("Error");
        res.status(500).send("Error backend server")
    }
})


applicantsRouter.post('/login', async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.password
    try {

        const existedUser = await applicantsController.findByEmail(email);
        if (existedUser.Email.length > 0) {

            if (await ComparePassword(password, existedUser.Password)) {

                const token = generateAccessToken(existedUser.Email);
                res.status(201).json(token);
            } else {
                res.status(400).send("Invalid Credentials");
            }

        } else {
            res.status(200).send("Applicant does not exists!")
        }
    }
    catch (err) {
        console.log("Error");
        res.status(500).send("Error backend server")
    }
})

export default applicantsRouter