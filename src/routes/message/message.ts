import { Router } from 'express';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { MessageController } from '../../controllers/messageController';

const authMiddleware = new AuthMiddleware()
const messageController = new MessageController()
const router: Router = Router();

router.post('/messages/send-messsage/:id',
    [
        authMiddleware.validateAccessToken
    ],
    messageController.sendMessage.bind(messageController)
)

router.get('/messages/:id',
    [
        authMiddleware.validateAccessToken
    ],
    messageController.getMessages.bind(messageController)
)

export default router