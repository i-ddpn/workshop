import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  phoneNumber: {
    type: String,
    required: true,
  },
})

const Client = mongoose.model('Client', clientSchema)

export default Client
