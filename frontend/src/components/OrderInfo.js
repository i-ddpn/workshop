import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OrderInfo = ({ order }) => {
  return (
    <>
      <Row className='justify-content-md-center'>
        <Col md='2'>Клиент</Col>
        <Col md='3'>
          <Link to={`/clients/${order.client && order.client._id}`}>
            {order.client && order.client.lastName}{' '}
            {order.client && order.client.firstName}{' '}
            {order.client && order.client.middleName}
          </Link>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md='2'>Услуга</Col>
        <Col md='3'>{order.service && order.service.name}</Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md='2'>Менеджер</Col>
        <Col md='3'>
          <Link to={`/users/${order.manager && order.manager._id}`}>
            {order.manager && order.manager.lastName}{' '}
            {order.manager && order.manager.firstName}{' '}
            {order.manager && order.manager.middleName}
          </Link>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md='2'>Мастер</Col>
        <Col md='3'>
          {order.master && order.master.lastName}{' '}
          {order.master && order.master.firstName}{' '}
          {order.master && order.master.middleName}
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md='2'>Объект ремонта</Col>
        <Col md='3'>{order.object}</Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md='2'>Дата приёма</Col>
        <Col md='3'>
          {order.dateIn && new Date(order.dateIn).toLocaleString()}
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md='2'>Дата выдачи</Col>
        <Col md='3'>
          {order.dateOut && new Date(order.dateOut).toLocaleString()}
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col md='2'>Статус</Col>
        <Col md='3'>{order.status && order.status.name}</Col>
      </Row>
    </>
  )
}

export default OrderInfo
