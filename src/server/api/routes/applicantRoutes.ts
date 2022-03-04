import { Router, Request, Response } from 'express'
import * as applicantsController from '../controllers/applicantController'
import { GetAllApplicantsFilters } from '../../db/dal/types'

const applicantsRouter = Router()

applicantsRouter.get('/', async (req: Request, res: Response) => {
    const filters: GetAllApplicantsFilters = req.query
    console.log(filters)
    const results = await applicantsController.getAll(filters)
    return res.status(200).send(results)

})

applicantsRouter.get('/:id', async (req: Request, res: Response) => {
    console.log("GOt a fukin problem!! "+req.params.id)
    const applicantId = Number(req.params.id)
    console.log("GOt a fukin problem!! "+applicantId)
    const results = await applicantsController.findById(applicantId)
    return res.status(200).send(results)
})
// applicantsRouter.put('/:id', () => {
//     // update ingredient
// })
// applicantsRouter.delete('/:id', () => {
//     // delete ingredient
// })
// applicantsRouter.post('/', () => {
//     // create ingredient

export default applicantsRouter