import express from 'express'
import {
  getMastersStats,
  getManagersStats,
} from '../controllers/statsController.js'
import { protect, director } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/masters').get(protect, director, getMastersStats)
router.route('/managers').get(protect, director, getManagersStats)

export default router
