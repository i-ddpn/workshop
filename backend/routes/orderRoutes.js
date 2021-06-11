import express from 'express'
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').post(protect, createOrder).get(protect, getOrders)
router
  .route('/:id')
  .get(protect, getOrderById)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder)

export default router
