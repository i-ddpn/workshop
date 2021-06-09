import asyncHandler from 'express-async-handler'
import Position from '../models/positionModel.js'

const getPositions = asyncHandler(async (req, res) => {
  const positions = await Position.find({})
  res.json(positions)
})

export { getPositions }
