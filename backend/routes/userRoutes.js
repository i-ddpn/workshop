import express from 'express'
import {
  authUser,
  createUser,
  getUserProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').post(createUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
