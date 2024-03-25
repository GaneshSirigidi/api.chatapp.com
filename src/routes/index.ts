import { Request, Response, Router, NextFunction } from 'express'

import user from './user/user'
import message from './message/message'

const router: Router = Router();

router.use(user)
router.use(message)

export default router