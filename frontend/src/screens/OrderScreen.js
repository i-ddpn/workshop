import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getOrderDetails(match.params.id))
    }
  }, [dispatch, userInfo, history, match])

  return (
    <>
      <Link to='/orders' className='btn btn-light my-3'>
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
            <Col md='2'>Клиент</Col>
            <Col md='3'>
              <Link to={`/clients/${order.client && order.client._id}`}>
                {order.client && order.client.lastName}{' '}
                {order.client && order.client.firstName}{' '}
                {order.client && order.client.middleName}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md='2'>Услуга</Col>
            <Col md='3'>{order.service && order.service.name}</Col>
          </Row>
          <Row>
            <Col md='2'>Менеджер</Col>
            <Col md='3'>
              <Link to={`/users/${order.manager && order.manager._id}`}>
                {order.manager && order.manager.lastName}{' '}
                {order.manager && order.manager.firstName}{' '}
                {order.manager && order.manager.middleName}
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md='2'>Мастер</Col>
            <Col md='3'>
              {order.master && order.master.lastName}{' '}
              {order.master && order.master.firstName}{' '}
              {order.master && order.master.middleName}
            </Col>
          </Row>
          <Row>
            <Col md='2'>Объект ремонта</Col>
            <Col md='3'>{order.object}</Col>
          </Row>
          <Row>
            <Col md='2'>Дата приёма</Col>
            <Col md='3'>{order.dateIn}</Col>
          </Row>
          <Row>
            <Col md='2'>Дата выдачи</Col>
            <Col md='3'>{order.dateOut}</Col>
          </Row>
          <Row>
            <Col md='2'>Статус</Col>
            <Col md='3'>{order.status && order.status.name}</Col>
          </Row>
        </>
      )}
    </>
  )
}

export default OrderScreen
