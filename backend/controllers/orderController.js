import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import User from '../models/userModel.js'
import Client from '../models/clientModel.js'
import Service from '../models/serviceModel.js'
import OrderStatus from '../models/orderStatusModel.js'

const createOrder = asyncHandler(async (req, res) => {
  const { client, service, object } = req.body

  const order = await Order.create({
    client,
    service,
    manager: req.user,
    object,
    dateIn: Date.now(),
    status: await OrderStatus.findOne({ name: 'Принят менеджером' }),
  })

  if (order) {
    const clientObj = (await Client.findById(order.client)) || {}
    const managerObj = (await User.findById(order.manager)) || {}
    const serviceObj = (await Service.findById(order.service)) || {}
    const statusObj = (await OrderStatus.findOne(order.status)) || {}
    res.status(201).json({
      ...order._doc,
      client: clientObj,
      manager: managerObj,
      service: serviceObj,
      status: statusObj,
    })
  } else {
    res.status(400)
    throw new Error('Введены некорректные данные')
  }
})

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  const clientObj = (await Client.findById(order.client)) || {}
  const managerObj = (await User.findById(order.manager)) || {}
  const masterObj = (await User.findById(order.master)) || {}
  const serviceObj = (await Service.findById(order.service)) || {}
  const statusObj = (await OrderStatus.findOne(order.status)) || {}

  if (order) {
    res.json({
      ...order._doc,
      client: clientObj,
      manager: managerObj,
      master: masterObj,
      service: serviceObj,
      status: statusObj,
    })
  } else {
    res.status(404)
    throw new Error('Заказ не найден')
  }
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()

  const newOrders = []
  for (const order of orders) {
    const clientObj = (await Client.findById(order.client)) || {}
    const managerObj = (await User.findById(order.manager)) || {}
    const masterObj = (await User.findById(order.master)) || {}
    const serviceObj = (await Service.findById(order.service)) || {}
    const statusObj = (await OrderStatus.findOne(order.status)) || {}

    const newOrder = {
      ...order._doc,
      client: clientObj,
      manager: managerObj,
      master: masterObj,
      service: serviceObj,
      status: statusObj,
    }

    newOrders.push(newOrder)
  }
  res.json(newOrders)
})

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    await order.remove()
    res.json({ message: 'Заказ удалён' })
  } else {
    res.status(404)
    throw new Error('Заказ не найден')
  }
})

const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.master = req.body.master || order.master
    order.status = req.body.status || order.status

    const statusObj = (await OrderStatus.findOne(order.status)) || {}
    if (statusObj.name.includes('возвращен')) order.dateOut = Date.now()

    const updatedOrder = await order.save()

    const clientObj = (await Client.findById(updatedOrder.client)) || {}
    const managerObj = (await User.findById(updatedOrder.manager)) || {}
    const masterObj = (await User.findById(order.master)) || {}
    const serviceObj = (await Service.findById(updatedOrder.service)) || {}

    res.json({
      ...updatedOrder._doc,
      client: clientObj,
      manager: managerObj,
      master: masterObj,
      service: serviceObj,
      status: statusObj,
    })
  } else {
    res.status(404)
    throw new Error('Заказ не найден')
  }
})

export { createOrder, getOrderById, getOrders, deleteOrder, updateOrder }
