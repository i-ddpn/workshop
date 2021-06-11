import mongoose from 'mongoose'
import dotenv from 'dotenv'

import users from './users.js'
import positions from './positions.js'
import clients from './clients.js'
import orderStatuses from './orderStatuses.js'
import services from './services.js'

import User from '../models/userModel.js'
import Position from '../models/positionModel.js'
import Client from '../models/clientModel.js'
import Order from '../models/orderModel.js'
import OrderStatus from '../models/orderStatusModel.js'
import Service from '../models/serviceModel.js'

import { NUMBER_OF_ORDERS } from './constants.js'
import { smartphones } from './auxiliary/smartphones.js'

import connectDB from '../config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Position.deleteMany()
    await Client.deleteMany()
    await Order.deleteMany()
    await OrderStatus.deleteMany()
    await Service.deleteMany()

    const createdPositions = await Position.insertMany(positions)

    await User.insertMany(
      users.map((user) => ({
        ...user,
        position: createdPositions[user.positionNumber],
      }))
    )

    const createdClients = await Client.insertMany(clients)
    const createdOrderStatuses = await OrderStatus.insertMany(orderStatuses)
    const createdServices = await Service.insertMany(services)

    const managers = await User.find({ position: createdPositions[1] })
    const masters = await User.find({ position: createdPositions[0] })

    const firstDate = 1613374116724
    const lastDate = 1623374116724

    const orders = []
    for (let i = 0; i < NUMBER_OF_ORDERS; i++) {
      const client =
        createdClients[Math.floor(Math.random() * createdClients.length)]
      const service =
        createdServices[Math.floor(Math.random() * createdServices.length)]
      const manager = managers[Math.floor(Math.random() * managers.length)]
      const status =
        createdOrderStatuses[
          Math.floor(Math.random() * createdOrderStatuses.length)
        ]
      const master =
        status.name !== 'Принят менеджером'
          ? masters[Math.floor(Math.random() * masters.length)]
          : undefined
      const object = smartphones[Math.floor(Math.random() * smartphones.length)]
      const dateIn = new Date(
        firstDate + Math.floor(Math.random() * (lastDate - firstDate))
      )
      const dateOut = status.name.includes('возвращен')
        ? new Date(
            dateIn.valueOf() + Math.floor(Math.random() * (lastDate - dateIn))
          )
        : undefined

      orders.push({
        client,
        service,
        manager,
        master,
        object,
        dateIn,
        dateOut,
        status,
      })
    }

    await Order.insertMany(orders)

    console.log('Data imported.')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Position.deleteMany()
    await Client.deleteMany()
    await Order.deleteMany()
    await OrderStatus.deleteMany()
    await Service.deleteMany()

    console.log('Data destroyed.')
    process.exit()
  } catch (error) {
    console.error(`Error: ${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
