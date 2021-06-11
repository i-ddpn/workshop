import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getClientDetails, editClient } from '../actions/clientActions'
import { CLIENT_EDIT_RESET } from '../constants/clientConstants'

const ClientEditScreen = ({ match, history }) => {
  const clientId = match.params.id

  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const clientDetails = useSelector((state) => state.clientDetails)
  const { loading, error, client } = clientDetails

  const clientEdit = useSelector((state) => state.clientEdit)
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = clientEdit

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (successEdit) {
      dispatch({ type: CLIENT_EDIT_RESET })
      history.push(`/clients/${clientId}`)
    } else if (client) {
      if (!client._id || client._id !== clientId) {
        dispatch(getClientDetails(clientId))
      } else {
        setLastName(client.lastName)
        setFirstName(client.firstName)
        setMiddleName(client.middleName)
        setPhoneNumber(client.phoneNumber)
      }
    }
  }, [dispatch, history, clientId, client, successEdit, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      editClient({
        _id: clientId,
        firstName,
        middleName,
        lastName,
        phoneNumber,
      })
    )
  }

  return (
    <>
      <Link to='/clients' className='btn btn-light my-3'>
        Назад
      </Link>
      <FormContainer>
        <h1>Редактировать клиента</h1>
        {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
        {loading || loadingEdit ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : errorEdit ? (
          <Message variant='danger'>{errorEdit}</Message>
        ) : (
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
              Изменить
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ClientEditScreen
