import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createOrder } from '../actions/orderActions'
import { listClients } from '../actions/clientActions'
import { listServices } from '../actions/serviceActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const OrderCreateScreen = ({ history }) => {
  const [client, setClient] = useState('')
  const [service, setService] = useState('')
  const [object, setObject] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderCreate = useSelector((state) => state.orderCreate)
  const { loading, success, error, order } = orderCreate

  const clientList = useSelector((state) => state.clientList)
  const { loading: loadingClients, error: errorClients, clients } = clientList

  const serviceList = useSelector((state) => state.serviceList)
  const {
    loading: loadingServices,
    error: errorServices,
    services,
  } = serviceList

  useEffect(() => {
    if (userInfo) {
      dispatch(listClients())
      dispatch(listServices())
    } else {
      history.push('/login')
    }

    if (success) {
      history.push(`/orders/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [dispatch, history, order, success, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createOrder(client, service, object))
  }

  return (
    <>
      <Link to='/orders' className='btn btn-light my-3'>
        Назад
      </Link>
      <FormContainer>
        <h1>Добавление заказа</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {errorClients && <Message variant='danger'>{errorClients}</Message>}
        {errorServices && <Message variant='danger'>{errorServices}</Message>}
        {loading || loadingClients || loadingServices ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='client'>
              <Form.Label>Клиент</Form.Label>
              <Form.Control
                as='select'
                value={client}
                onChange={(e) => setClient(e.target.value)}
              >
                {clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.lastName} {client.firstName} {client.middleName}
                  </option>
                ))}
              </Form.Control>
              <LinkContainer to='/clients/create'>
                <Button className='my-3'>
                  <i className='fas fa-plus'></i> Добавить клиента
                </Button>
              </LinkContainer>
            </Form.Group>

            <Form.Group controlId='service'>
              <Form.Label>Услуга</Form.Label>
              <Form.Control
                as='select'
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='object'>
              <Form.Label>Объект ремонта</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите объект ремонта'
                value={object}
                onChange={(e) => setObject(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Создать
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default OrderCreateScreen
