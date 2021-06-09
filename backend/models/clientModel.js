import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
})

const Client = mongoose.model('Client', clientSchema)

export default Client
