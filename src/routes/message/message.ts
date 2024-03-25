import { Router } from 'express';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { MessageController } from '../../controllers/messageController';

const authMiddleware = new AuthMiddleware()
const messageController = new MessageController()
const router: Router = Router();

router.post('/send-messsage/:id',
    [
        authMiddleware.validateAccessToken
    ],
    messageController.sendMessage.bind(messageController)
)

export default router