import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listServices } from '../actions/serviceActions'

const ServiceListScreen = () => {
  const dispatch = useDispatch()

  const serviceList = useSelector((state) => state.serviceList)
  const { loading, error, services } = serviceList

  useEffect(() => {
    dispatch(listServices())
  }, [dispatch])

  return (
    <>
      <h1>Прайс-лист</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Услуга</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>{service.name}</td>
                  <td>от {service.price} руб.</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ServiceListScreen
