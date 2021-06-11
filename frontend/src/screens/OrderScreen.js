import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'
import OrderInfo from '../components/OrderInfo'

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
      <h1>Заказ</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <OrderInfo order={order} />
      )}
    </>
  )
}

export default OrderScreen
