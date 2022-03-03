import { Router, Request, Response} from 'express'
import * as applicantsController from '../controllers/applicantController'
import { CreateApplicantDTO, FilterApplicantsDTO, UpdateApplicantDTO } from '../dto/applicantDto'
const applicantsRouter = Router()
applicantsRouter.get('/', async (req: Request, res: Response) => {
    console.log("TEST 1 2 3")
    const filters: FilterApplicantsDTO = req.query
    console.log(filters)
    const results = await applicantsController.getAll(filters)
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