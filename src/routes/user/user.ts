import { Router } from 'express';

import { UserController } from '../../controllers/userController';

const userController = new UserController()
const router: Router = Router();

router.post('/users/signup',userController.signUp)

export default router;
