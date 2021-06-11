import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderPrintScreen = ({ history, match }) => {
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

  let typeLabel, dateLabel, date, managerLabel, objectLabel
  if (!loading && order.status) {
    if (!order.status.name.includes('возвращен')) {
      typeLabel = 'Чек'
      dateLabel = 'выдачи'
      date = order.dateOut && new Date(order.dateOut).toLocaleString()
      managerLabel = 'Выдал'
      objectLabel = 'Выданный'
    } else {
      typeLabel = 'Расписка'
      dateLabel = 'получения'
      date = order.dateIn && new Date(order.dateIn).toLocaleString()
      managerLabel = 'Получил'
      objectLabel = 'Принятый'
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Link to={`/orders/${order._id}`} className='btn btn-light my-3'>
            Назад
          </Link>
          <h1>Заказ</h1>
          <div className='print'>
            <div class='underlined name'>"Ремонтная мастерская"</div>
            <table class='order-table'>
              <tr>
                <th colspan='4'>{typeLabel}</th>
              </tr>
              <tr>
                <td class='left'>{objectLabel} объект</td>
                <td class='right'>
                  <strong>{order.object}</strong>
                </td>
                <td class='left'>Наименование услуги</td>
                <td class='right'>
                  <strong>{order.service && order.service.name}</strong>
                </td>
              </tr>
              <tr>
                <td class='left' colspan='3'>
                  Дата {dateLabel}
                </td>
                <td class='right'>{date}</td>
              </tr>
              <tr>
                <td class='left' colspan='1'>
                  ФИО клиента
                </td>
                <td class='right' colspan='3'>
                  {order.client && order.client.lastName}{' '}
                  {order.client && order.client.firstName}{' '}
                  {order.client && order.client.middleName}
                </td>
              </tr>
              {order.status && order.status.name.includes('возвращен') && (
                <>
                  <td class='left' colspan='1'>
                    Цена
                  </td>
                  <td class='right' colspan='3'>
                    {order.service && order.service.price}
                  </td>
                </>
              )}
              <tr>
                <td class='left' colspan='3'>
                  <p>
                    {managerLabel}:{' '}
                    <span class='underlined fio-blank'>&nbsp;</span>
                  </p>
                  <p class='sub'>(Фамилия И.О.)</p>
                </td>
                <td class='right'>
                  <p>
                    <span class='underlined signature-blank'>&nbsp;</span>
                  </p>
                  <p class='sub'>(подпись)</p>
                </td>
              </tr>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default OrderPrintScreen
