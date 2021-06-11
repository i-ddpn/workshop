import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import OrderStatus from '../models/orderStatusModel.js'

const createOrder = asyncHandler(async (req, res) => {
  const { client, service, object } = req.body

  const createdOrder = await Order.create({
    client,
    service,
    manager: req.user,
    object,
    dateIn: Date.now(),
    status: await OrderStatus.findOne({ name: 'Принят менеджером' }),
  })
  const order = await createdOrder
    .populate('client')
    .populate('manager')
    .populate('service')
    .populate('status')

  if (order) {
    res.status(201).json(order)
  } else {
    res.status(400)
    throw new Error('Введены некорректные данные')
  }
})

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('client')
    .populate('manager')
    .populate('master')
    .populate('service')
    .populate('status')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Заказ не найден')
  }
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('client')
    .populate('service')
    .populate('status')

  res.json(orders)
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
  const order = await Order.findById(req.params.id).populate('status')

  if (order) {
    order.master = req.body.master || order.master
    order.status = req.body.status || order.status

    const statusObj = (await OrderStatus.findOne(order.status)) || {}
    if (statusObj.name.includes('возвращен')) order.dateOut = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Заказ не найден')
  }
})

export { createOrder, getOrderById, getOrders, deleteOrder, updateOrder }
