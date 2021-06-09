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
      users.map((user) => ({ ...user, position: createdPositions[2] }))
    )

    await Client.insertMany(clients)
    await OrderStatus.insertMany(orderStatuses)
    await Service.insertMany(services)

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
