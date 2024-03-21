import { Request, Response, Router, NextFunction } from 'express'

import user from './user/user'

const router: Router = Router()
router.use(user)

export default router