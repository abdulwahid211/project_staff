import { Router, Request, Response } from 'express'
import * as VacancyController from '../controllers/vacancyController'
import { GetAllFilters } from '../../db/dal/types'
import { Vacancy, VacancyInput } from '../../model/vacancy.model';

const VacancyRouter = Router()

// get all Vacancy 
VacancyRouter.get('/', async (req: Request, res: Response) => {
    const filters: GetAllFilters = req.query
    console.log(filters)
    const results = await VacancyController.getAll(filters)
    return res.status(200).send(results)

})

// get individual applicant by id  
VacancyRouter.get('/:id', async (req: Request, res: Response) => {
    const applicantId = Number(req.params.id)
    const results = await VacancyController.findById(applicantId)
    return res.status(200).send(results)
})


VacancyRouter.put('/:id', async (req: Request, res: Response) => {
    const Vacancy: Vacancy = req.body;
    const VacancyId = Number(req.params.id);
    var updatedVacancy = await VacancyController.updateVacancy(VacancyId, Vacancy);
    return res.status(200).send(updatedVacancy);
})


VacancyRouter.delete('/:id', async (req: Request, res: Response) => {
    const VacancyId = Number(req.params.id);
    var deleteApplicant = await VacancyController.deleteVacancy(VacancyId);
    return res.status(200).send(deleteApplicant);
})


VacancyRouter.post('/', async (req: Request, res: Response) => {
    const applicant: VacancyInput = req.body;
    var newApplicant = await VacancyController.createVacancy(applicant)
    return res.status(200).send(newApplicant)
})

export default VacancyRouter