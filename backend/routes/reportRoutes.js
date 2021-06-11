import express from 'express'
import { getMasterReport } from '../controllers/reportController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/my').get(protect, getMasterReport)

export default router
