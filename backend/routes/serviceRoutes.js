import express from 'express'
import asyncHandler from 'express-async-handler'
import Service from '../models/serviceModel.js'

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const services = await Service.find({})
    res.json(services)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id)
    if (service) {
      res.json(service)
    } else {
      res.status(404)
      throw new Error('Service not found')
    }
  })
)

export default router
