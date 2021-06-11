import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getReportMaster } from '../actions/reportActions'

const ServiceListScreen = () => {
  const dispatch = useDispatch()

  const reportMaster = useSelector((state) => state.reportMaster)
  const { loading, error, orders } = reportMaster

  useEffect(() => {
    dispatch(getReportMaster())
  }, [dispatch])

  return (
    <>
      <h1>Отчёт мастера</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='print'>
          <table className='print-table'>
            <thead>
              <tr>
                <th>Услуга</th>
                <th>Объект ремонта</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.service && order.service.name}</td>
                  <td>{order.object}</td>
                  <td>{order.status && order.status.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default ServiceListScreen
