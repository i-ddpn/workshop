import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import serviceRoutes from './routes/serviceRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/services', serviceRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log('Server running'))
