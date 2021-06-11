import asyncHandler from 'express-async-handler'
import OrderStatus from '../models/orderStatusModel.js'

const getOrderStatuses = asyncHandler(async (req, res) => {
  const orderStatuses = await OrderStatus.find({})
  res.json(orderStatuses)
})

const getOrderStatusById = asyncHandler(async (req, res) => {
  const orderStatus = await OrderStatus.findById(req.params.id)
  if (orderStatus) {
    res.json(orderStatus)
  } else {
    res.status(404)
    throw new Error('Состояние заказа не найдено')
  }
})

export { getOrderStatuses, getOrderStatusById }
