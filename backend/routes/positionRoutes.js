import express from 'express'
import { getPositions } from '../controllers/positionController.js'

const router = express.Router()

router.route('/').get(getPositions)

export default router
