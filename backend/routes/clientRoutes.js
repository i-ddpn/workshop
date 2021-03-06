import express from 'express'
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from '../controllers/clientController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
router.route('/').post(protect, createClient).get(protect, getClients)
router
  .route('/:id')
  .get(protect, getClientById)
  .put(protect, updateClient)
  .delete(protect, deleteClient)

export default router
