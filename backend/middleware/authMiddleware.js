import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Position from '../models/positionModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')
      req.user.position = await Position.findById(req.user.position)

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Ошибка авторизации')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Пользователь не авторизован')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Недостаточно прав')
  }
}

const director = (req, res, next) => {
  if (req.user && req.user.position && req.user.position.name === 'Директор') {
    next()
  } else {
    res.status(401)
    throw new Error('Недостаточно прав')
  }
}

export { protect, admin, director }
