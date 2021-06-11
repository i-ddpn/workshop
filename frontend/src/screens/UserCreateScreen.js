import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createUser } from '../actions/userActions'
import { listPositions } from '../actions/positionActions'
import { USER_CREATE_RESET } from '../constants/userConstants'

const UserCreateScreen = ({ history }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [position, setPosition] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userCreate = useSelector((state) => state.userCreate)
  const { loading, success, error, user } = userCreate

  const positionList = useSelector((state) => state.positionList)
  const {
    loading: loadingPositions,
    error: errorPositions,
    positions,
  } = positionList

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listPositions())
    } else {
      history.push('/login')
    }

    if (success) {
      history.push(`/users/${user._id}`)
      dispatch({ type: USER_CREATE_RESET })
    }
  }, [dispatch, history, user, success, userInfo])

  useEffect(() => {
    setPosition(positions.length && positions[0]._id)
  }, [positions])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают')
    } else {
      dispatch(
        createUser(
          login,
          password,
          firstName,
          middleName,
          lastName,
          position,
          isAdmin
        )
      )
    }
  }

  return (
    <>
      <Link to='/users' className='btn btn-light my-3'>
        Назад
      </Link>
      <FormContainer>
        <h1>Добавление пользователя</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {errorPositions && <Message variant='danger'>{errorPositions}</Message>}
        {(loading || loadingPositions) && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='login'>
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите логин'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type='password'
              placeholder='Введите пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Подтвердите пароль</Form.Label>
            <Form.Control
              type='password'
              placeholder='Подтверждение пароля'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

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

          <Form.Group controlId='position'>
            <Form.Label>Должность</Form.Label>
            <Form.Control
              as='select'
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              {positions.map((position) => (
                <option key={position._id} value={position._id}>
                  {position.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='is_admin'>
            <Form.Check
              type='checkbox'
              label='Администратор'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Создать
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default UserCreateScreen
