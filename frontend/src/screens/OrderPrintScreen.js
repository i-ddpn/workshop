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
            <div className='underlined name'>"Ремонтная мастерская"</div>
            <table className='order-table'>
              <tbody>
                <tr>
                  <th colSpan='4'>{typeLabel}</th>
                </tr>
                <tr>
                  <td className='left'>{objectLabel} объект</td>
                  <td className='right'>
                    <strong>{order.object}</strong>
                  </td>
                  <td className='left'>Наименование услуги</td>
                  <td className='right'>
                    <strong>{order.service && order.service.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td className='left' colSpan='3'>
                    Дата {dateLabel}
                  </td>
                  <td className='right'>{date}</td>
                </tr>
                <tr>
                  <td className='left' colSpan='1'>
                    ФИО клиента
                  </td>
                  <td className='right' colSpan='3'>
                    {order.client && order.client.lastName}{' '}
                    {order.client && order.client.firstName}{' '}
                    {order.client && order.client.middleName}
                  </td>
                </tr>
                {order.status && order.status.name.includes('возвращен') && (
                  <>
                    <td className='left' colSpan='1'>
                      Цена
                    </td>
                    <td className='right' colSpan='3'>
                      {order.service && order.service.price}
                    </td>
                  </>
                )}
                <tr>
                  <td className='left' colSpan='3'>
                    <p>
                      {managerLabel}:{' '}
                      <span className='underlined fio-blank'>&nbsp;</span>
                    </p>
                    <p className='sub'>(Фамилия И.О.)</p>
                  </td>
                  <td className='right'>
                    <p>
                      <span className='underlined signature-blank'>&nbsp;</span>
                    </p>
                    <p className='sub'>(подпись)</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default OrderPrintScreen
