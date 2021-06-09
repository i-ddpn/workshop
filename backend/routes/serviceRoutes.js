import express from 'express'
import {
  getServices,
  getServiceById,
} from '../controllers/serviceController.js'

const router = express.Router()

router.route('/').get(getServices)
router.route('/:id').get(getServiceById)

export default router
