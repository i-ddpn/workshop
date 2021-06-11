import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createClient } from '../actions/clientActions'
import { CLIENT_CREATE_RESET } from '../constants/clientConstants'

const ClientCreateScreen = ({ history }) => {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const clientCreate = useSelector((state) => state.clientCreate)
  const { loading, success, error, client } = clientCreate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (success) {
      history.push(`/clients/${client._id}`)
      dispatch({ type: CLIENT_CREATE_RESET })
    }
  }, [dispatch, history, client, success, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createClient(firstName, middleName, lastName, phoneNumber))
  }

  return (
    <>
      <Link to='/clients' className='btn btn-light my-3'>
        Назад
      </Link>
      <FormContainer>
        <h1>Добавление клиента</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='last_name'>
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите фамилию'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='first_name'>
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите имя'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='middle_name'>
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите отчество'
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='phone_number'>
            <Form.Label>Номер телефона</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите номер телефона'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Добавить
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ClientCreateScreen
