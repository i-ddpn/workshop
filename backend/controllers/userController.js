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
      position: { name: position.name },
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Введены неправильные данные для входа')
  }
})

const createUser = asyncHandler(async (req, res) => {
  const { login, password, firstName, middleName, lastName, positionId } =
    req.body

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
    position: positionId,
  })

  if (user) {
    const position = (await Position.findById(user.position)) || {}
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      position: { name: position.name },
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
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      position: { name: position.name },
    })
  }
})

export { authUser, createUser, getUserProfile }
