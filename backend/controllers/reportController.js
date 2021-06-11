import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

const getMasterReport = asyncHandler(async (req, res) => {
  const orders = []

  const ordersAll = await Order.find({})
    .populate('status')
    .populate('service')
    .populate({ path: 'master', select: '-password' })
  for (const order of ordersAll) {
    if (
      order.master &&
      order.master._id.toString() === req.user._id.toString()
    ) {
      orders.push(order)
    }
  }

  res.json(
    orders.sort((order1, order2) =>
      order2.status._id < order1.status._id ? -1 : 1
    )
  )
})

export { getMasterReport }
