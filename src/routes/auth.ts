import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import adapter from './adapter/adapter'

const router = Router()

router.post('/sign-in', adapter(AuthController.signIn))
router.post('/sign-up', adapter(AuthController.signUp))
router.post('/avatar', adapter(AuthController.avatar))

export const getRouter = () => router
