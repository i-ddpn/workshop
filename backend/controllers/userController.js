import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Position from '../models/positionModel.js'

const authUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body

  const user = await User.findOne({ login })

  if (user && (await user.matchPassword(password))) {
    const position = (await Position.findById(user.position)) || ''
    res.json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      position: { _id: position._id, name: position.name },
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Введены неправильные данные для входа')
  }
})

const createUser = asyncHandler(async (req, res) => {
  const {
    login,
    password,
    firstName,
    middleName,
    lastName,
    position,
    isAdmin,
  } = req.body

  const userExists = await User.findOne({ login })

  if (userExists) {
    res.status(400)
    throw new Error('Пользователь с таким логином уже существует')
  }

  const user = await User.create({
    login,
    password,
    firstName,
    middleName,
    lastName,
    position,
    isAdmin,
  })

  if (user) {
    const positionObj = (await Position.findById(user.position)) || {}
    res.status(201).json({
      _id: user._id,
      login: user.login,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      position: { _id: positionObj._id, name: positionObj.name },
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Введены некорректные данные')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const position = (await Position.findById(user.position)) || {}

  if (user) {
    res.json({
      _id: user._id,
      login: user.login,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      position: { _id: position._id, name: position.name },
    })
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  const position = (await Position.findById(user.position)) || {}

  if (user) {
    res.json({
      ...user._doc,
      position: { _id: position._id, name: position.name },
    })
  } else {
    res.status(404)
    throw new Error('Пользователь не найден')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  const positions = await Position.find()
  const positionNames = {}
  positions.forEach((position) => (positionNames[position._id] = position.name))

  res.json(
    users.map((user) => ({
      ...user._doc,
      position: { name: positionNames[user.position] },
    }))
  )
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'Пользователь удалён' })
  } else {
    res.status(404)
    throw new Error('Пользователь не найден')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.login = req.body.login || user.login
    user.firstName = req.body.firstName || user.firstName
    user.middleName = req.body.middleName || user.middleName
    user.lastName = req.body.lastName || user.lastName
    user.position = req.body.position || user.position
    user.isAdmin = req.body.isAdmin || user.isAdmin

    const updatedUser = await user.save()

    const position = (await Position.findById(user.position)) || {}
    res.json({
      _id: updatedUser._id,
      login: updatedUser.login,
      firstName: updatedUser.firstName,
      middleName: updatedUser.middleName,
      lastName: updatedUser.lastName,
      isAdmin: updatedUser.isAdmin,
      position: { _id: position._id, name: position.name },
    })
  } else {
    res.status(404)
    throw new Error('Пользователь не найден')
  }
})

export {
  authUser,
  createUser,
  getUserProfile,
  getUserById,
  getUsers,
  deleteUser,
  updateUser,
}
