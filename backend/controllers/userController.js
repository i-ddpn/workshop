import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Position from '../models/positionModel.js'

const authUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body

  const user = await User.findOne({ login }).populate('position')

  if (user && (await user.matchPassword(password))) {
    res.json({
      ...user._doc,
      password: undefined,
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

  const createdUser = await User.create({
    login,
    password,
    firstName,
    middleName,
    lastName,
    position,
    isAdmin,
  })

  const user = await createdUser.populate('position').select('-password')

  if (user) {
    res.status(201).json({
      ...user._doc,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Введены некорректные данные')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('position')
    .select('-password')

  if (user) {
    res.json(user)
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('position')
    .select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('Пользователь не найден')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate('position')
  res.json(users)
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

    res.json(updatedUser)
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
