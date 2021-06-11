import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getStatsManagers } from '../actions/statsActions'

const ServiceListScreen = () => {
  const dispatch = useDispatch()

  const statsManagers = useSelector((state) => state.statsManagers)
  const { loading, error, stats } = statsManagers

  useEffect(() => {
    dispatch(getStatsManagers())
  }, [dispatch])

  return (
    <>
      <Link to='/stats' className='btn btn-light my-3'>
        Назад
      </Link>
      <Link to='/stats/masters' className='btn btn-light my-3'>
        Мастеры
      </Link>
      <h1>Статистика менеджеров</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Менеджер</th>
                <th>Количество принятых заказов</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((statsRecord) => (
                <tr key={statsRecord.manager._id}>
                  <td>
                    <Link
                      to={`/users/${
                        statsRecord.manager && statsRecord.manager._id
                      }`}
                    >
                      {statsRecord.manager && statsRecord.manager.lastName}{' '}
                      {statsRecord.manager && statsRecord.manager.firstName}{' '}
                      {statsRecord.manager && statsRecord.manager.middleName}
                    </Link>
                  </td>
                  <td>{statsRecord.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ServiceListScreen
