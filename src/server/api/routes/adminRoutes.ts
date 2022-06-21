import { Router, Request, Response } from 'express'
import * as adminController from '../controllers/adminController'
import * as employerController from '../controllers/employerController'
import { GetAllFilters } from '../../db/dal/types'
import { Admin, AdminAttributes } from '../../model/admin.model';
import { ComparePassword } from '../../util/passwordUtil';
import { generateAccessToken, authenticateToken } from '../../util/tokenMethods';
import { EmployerAttributes } from '../../model/employer.model';

const adminRouter = Router()

// get all admin 
adminRouter.get('/', authenticateToken, async (req: Request, res: Response) => {
    const filters: GetAllFilters = req.query
    console.log(filters)
    const results = await adminController.getAll(filters)
    return res.status(200).send(results)

})

// get individual applicant by id  
adminRouter.get('/:id', authenticateToken, async (req: Request, res: Response) => {
    const applicantId = Number(req.params.id)
    const results = await adminController.findById(applicantId)
    return res.status(200).send(results)
})


adminRouter.put('/:id', authenticateToken, async (req: Request, res: Response) => {
    const admin: Admin = req.body;
    const adminId = Number(req.params.id);
    var updatedadmin = await adminController.updateAdmins(adminId, admin);
    return res.status(200).send(updatedadmin);
})


adminRouter.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    const adminId = Number(req.params.id);
    var deleteApplicant = await adminController.deleteAdmin(adminId);
    return res.status(200).send(deleteApplicant);
})


adminRouter.post('/', authenticateToken, async (req: Request, res: Response) => {
    const applicant: AdminAttributes = req.body;
    var newApplicant = await adminController.createAdmin(applicant)
    return res.status(200).send(newApplicant)
})


// adminRouter.post('/employer/register', async (req: Request, res: Response) => {

//     const employer: EmployerAttributes = req.body;
//     try {

//         const existedUser = await employerController.findByEmail(employer.Email);

//         if (existedUser.Email.length > 0) {
//             res.send("User Already Exists");
//         } else {

//             var newEmployerStatus = await employerController.createEmployer(employer)
//             return res.status(200).send("Success employer has been created " + newEmployerStatus)
//         }

//     }
//     catch (err) {
//         console.log("Error");
//         res.status(500).send("Error backend server")
//     }
// })

adminRouter.post('/register', async (req: Request, res: Response) => {

    const admin: AdminAttributes = req.body;
 
    try {

        const existedUser = await adminController.findByEmail(admin.Email);
        console.log(existedUser)
        if (existedUser.Email.length > 0) {
            res.send("User Already Exists");
        } else {

            var newAdminStatus = await adminController.createAdmin(admin)
            return res.status(200).send("Success admin has been created " + newAdminStatus)
        }

    }
    catch (err) {
        console.log("Error");
        res.status(500).send("Error backend server")
    }
})

adminRouter.post('/login', async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.password
    try {

        const existedUser = await adminController.findByEmail(email);
        if (existedUser.Email.length > 0) {

            if (await ComparePassword(password, existedUser.Password)) {

                const token = generateAccessToken(existedUser.Email);
                res.status(201).json(token);
            } else {
                res.status(400).send("Invalid Credentials");
            }

        } else {
            res.status(200).send("Admin does not exists!")
        }
    }
    catch (err) {
        console.log("Error");
        res.status(500).send("Error backend server")
    }
})

export default adminRouter