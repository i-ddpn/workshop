import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getClientDetails } from '../actions/clientActions'

const ClientScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const clientDetails = useSelector((state) => state.clientDetails)
  const { loading, error, client } = clientDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getClientDetails(match.params.id))
    }
  }, [dispatch, userInfo, history, match])

  return (
    <>
      <Link to='/clients' className='btn btn-light my-3'>
        Назад
      </Link>
      <h1>Профиль</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md='2'>ФИО</Col>
            <Col md='3'>
              {client.lastName} {client.firstName} {client.middleName}
            </Col>
          </Row>
          <Row>
            <Col md='2'>Номер телефона</Col>
            <Col md='3'>{client.phoneNumber}</Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ClientScreen
