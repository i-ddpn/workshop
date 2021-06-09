import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { doLogin } from '../actions/userActions'

const LoginScreen = ({ history }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(doLogin(login, password))
  }

  return (
    <FormContainer>
      <h1>Вход</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={loginHandler}>
        <Form.Group controlId='login' className='my-2'>
          <Form.Label>Логин:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Введите логин'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-2'>
          <Form.Label>Пароль:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Введите пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-2'>
          Войти
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
