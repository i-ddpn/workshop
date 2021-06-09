import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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
    req.status(401)
    throw new Error('Недостаточно прав')
  }
}

export { protect, admin }
