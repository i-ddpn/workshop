import asyncHandler from 'express-async-handler'
import Client from '../models/clientModel.js'

const createClient = asyncHandler(async (req, res) => {
  const { firstName, middleName, lastName, phoneNumber } = req.body

  const client = await Client.create({
    firstName,
    middleName,
    lastName,
    phoneNumber,
  })

  if (client) {
    res.status(201).json({
      ...client._doc,
    })
  } else {
    res.status(400)
    throw new Error('Введены некорректные данные')
  }
})

const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  if (client) {
    res.json({
      ...client._doc,
    })
  } else {
    res.status(404)
    throw new Error('Клиент не найден')
  }
})

const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find()
  res.json(clients.map((client) => client._doc))
})

const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  if (client) {
    await client.remove()
    res.json({ message: 'Клиент удалён' })
  } else {
    res.status(404)
    throw new Error('Клиент не найден')
  }
})

const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  if (client) {
    client.firstName = req.body.firstName || client.firstName
    client.middleName = req.body.middleName || client.middleName
    client.lastName = req.body.lastName || client.lastName
    client.phoneNumber = req.body.phoneNumber || client.phoneNumber

    const updatedClient = await client.save()

    res.json({
      ...updatedClient._doc,
    })
  } else {
    res.status(404)
    throw new Error('Клиент не найден')
  }
})

export { createClient, getClientById, getClients, deleteClient, updateClient }
