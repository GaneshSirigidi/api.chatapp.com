import { Router } from 'express';

import { UserController } from '../../controllers/userController';

const userController = new UserController()
const router: Router = Router();

router.post('/users/signup', userController.signUp.bind(userController))
router.post('/users/signin',userController.signIn.bind(userController))

export default router;
