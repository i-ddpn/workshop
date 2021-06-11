import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getOrderDetails, editOrder } from '../actions/orderActions'
import { listOrderStatuses } from '../actions/orderStatusActions'
import { ORDER_EDIT_RESET } from '../constants/orderConstants'
import OrderInfo from '../components/OrderInfo'

const OrderEditScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [status, setStatus] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails

  const orderEdit = useSelector((state) => state.orderEdit)
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = orderEdit

  const orderStatusList = useSelector((state) => state.orderStatusList)
  const {
    loading: loadingOrderStatuses,
    error: errorOrderStatuses,
    orderStatuses,
  } = orderStatusList

  useEffect(() => {
    if (userInfo) {
      dispatch(listOrderStatuses())
    } else {
      history.push('/login')
    }

    if (successEdit) {
      dispatch({ type: ORDER_EDIT_RESET })
      history.push(`/orders/${orderId}`)
    } else if (order) {
      if (!order._id || order._id !== orderId) {
        dispatch(getOrderDetails(orderId))
      } else {
        setStatus(order.status._id)
      }
    }
  }, [dispatch, history, orderId, order, successEdit, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      editOrder({
        _id: orderId,
        status,
        master: userInfo.position.name === 'Мастер' ? userInfo._id : undefined,
      })
    )
  }

  return (
    <>
      <Link to='/orders' className='btn btn-light my-3'>
        Назад
      </Link>
      {!loading && <OrderInfo order={order} />}
      <FormContainer>
        <h1>Редактировать заказ</h1>
        {errorEdit && <Message variant='danger'>{errorEdit}</Message>}
        {errorOrderStatuses && (
          <Message variant='danger'>{errorOrderStatuses}</Message>
        )}
        {loading || loadingEdit || loadingOrderStatuses ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : errorEdit ? (
          <Message variant='danger'>{errorEdit}</Message>
        ) : (
          <>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='status'>
                <Form.Label>Состояние заказа</Form.Label>
                <Form.Control
                  as='select'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {orderStatuses.map((orderStatus) => (
                    <option key={orderStatus._id} value={orderStatus._id}>
                      {orderStatus.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Изменить
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  )
}

export default OrderEditScreen
