import { Router } from 'express';

import { UserController } from '../../controllers/userController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';

const userController = new UserController();
const authMiddleware = new AuthMiddleware();

const router: Router = Router();

router.post('/users/signup', userController.signUp.bind(userController))
router.post('/users/signin', userController.signIn.bind(userController))
router.get('/users',
    [
        authMiddleware.validateAccessToken
    ],
    userController.listUsers.bind(userController))

export default router;
