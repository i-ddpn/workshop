import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders, deleteOrder } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDelete = useSelector((state) => state.orderDelete)
  const { success: successDelete } = orderDelete

  useEffect(() => {
    if (userInfo) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Заказы</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to='/orders/create'>
            <Button className='my-3'>
              <i className='fas fa-plus'></i> Добавить заказ
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Клиент</th>
              <th>Услуга</th>
              <th>Объект ремонта</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.client && order.client.lastName}{' '}
                  {order.client && order.client.firstName}{' '}
                  {order.client && order.client.middleName}
                </td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    {order.service && order.service.name}
                  </Link>
                </td>
                <td>{order.object}</td>
                <td>{order.status && order.status.name}</td>
                <td>
                  <LinkContainer to={`/orders/${order._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(order._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
