import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position',
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const User = mongoose.model('User', userSchema)

export default User
