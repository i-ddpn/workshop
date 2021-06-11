import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, editUser } from '../actions/userActions'
import { USER_EDIT_RESET } from '../constants/userConstants'
import { listPositions } from '../actions/positionActions'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [login, setLogin] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [position, setPosition] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userEdit = useSelector((state) => state.userEdit)
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = userEdit

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

    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET })
      history.push(`/users/${userId}`)
    } else if (user) {
      if (!user._id || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setLogin(user.login)
        setLastName(user.lastName)
        setFirstName(user.firstName)
        setMiddleName(user.middleName)
        setPosition(user.position._id)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successEdit, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      editUser({
        _id: userId,
        login,
        firstName,
        middleName,
        lastName,
        position,
        isAdmin,
      })
    )
  }

  return (
    <>
      <Link to='/users' className='btn btn-light my-3'>
        Назад
      </Link>
      <FormContainer>
        <h1>Редактировать пользователя</h1>
        {(loadingEdit || loadingPositions) && <Loader />}
        {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
        {errorPositions && <Message variant='danger'>{errorPositions}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
                {positions &&
                  positions.map((position) => (
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
              Изменить
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
