import express from 'express'
import {
  getOrderStatuses,
  getOrderStatusById,
} from '../controllers/orderStatusController.js'

const router = express.Router()

router.route('/').get(getOrderStatuses)
router.route('/:id').get(getOrderStatusById)

export default router
