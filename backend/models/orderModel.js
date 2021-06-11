import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  master: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  object: {
    type: String,
    required: true,
  },
  dateIn: {
    type: Date,
    required: true,
  },
  dateOut: {
    type: Date,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderStatus',
  },
})

const Order = mongoose.model('Order', orderSchema)

export default Order
