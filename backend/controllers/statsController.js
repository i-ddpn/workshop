import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

const getMastersStats = asyncHandler(async (req, res) => {
  const statsObj = {}

  const orders = await Order.find({})
    .populate('status')
    .populate('service')
    .populate({ path: 'master', select: '-password' })
  for (const order of orders) {
    if (order.status.name.includes('Успешно')) {
      if (!statsObj[order.master._id]) {
        statsObj[order.master._id] = { count: 0, cost: 0, master: order.master }
      } else {
        statsObj[order.master._id].count++
        statsObj[order.master._id].cost += order.service.price
      }
    }
  }

  const stats = []
  for (const key in statsObj) {
    stats.push(statsObj[key])
  }

  res.json(stats.sort((record1, record2) => record2.count - record1.count))
})

const getManagersStats = asyncHandler(async (req, res) => {
  const statsObj = {}

  const orders = await Order.find({})
    .populate('status')
    .populate({ path: 'manager', select: '-password' })
  for (const order of orders) {
    if (!statsObj[order.manager._id]) {
      statsObj[order.manager._id] = { count: 0, manager: order.manager }
    } else {
      statsObj[order.manager._id].count++
    }
  }

  const stats = []
  for (const key in statsObj) {
    stats.push(statsObj[key])
  }

  res.json(stats.sort((record1, record2) => record2.count - record1.count))
})

export { getMastersStats, getManagersStats }
