import asyncHandler from 'express-async-handler'
import Service from '../models/serviceModel.js'

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find({})
  res.json(services)
})

const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)
  if (service) {
    res.json(service)
  } else {
    res.status(404)
    throw new Error('Service not found')
  }
})

export { getServices, getServiceById }
