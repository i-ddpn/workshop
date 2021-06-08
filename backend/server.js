import express from 'express'
import dotenv from 'dotenv'
import services from './data/services.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send
})

app.get('/api/services', (req, res) => {
  res.json(services)
})

app.get('/api/services/:id', (req, res) => {
  const service = services.find((s) => s._id === req.params.id)
  res.json(service)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server running'))
