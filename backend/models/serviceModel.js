import mongoose from 'mongoose'

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

const Service = mongoose.model('Service', serviceSchema)

export default Service
