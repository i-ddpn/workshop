import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getStatsMasters } from '../actions/statsActions'

const ServiceListScreen = () => {
  const dispatch = useDispatch()

  const statsMasters = useSelector((state) => state.statsMasters)
  const { loading, error, stats } = statsMasters

  useEffect(() => {
    dispatch(getStatsMasters())
  }, [dispatch])

  return (
    <>
      <Link to='/stats' className='btn btn-light my-3'>
        Назад
      </Link>
      <Link to='/stats/managers' className='btn btn-light my-3'>
        Статистика менеджеров
      </Link>
      <h1>Статистика мастеров</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Мастер</th>
                <th>Количество выполненных заказов</th>
                <th>Стоимость выполненных заказов</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((statsRecord) => (
                <tr key={statsRecord.master._id}>
                  <td>
                    <Link
                      to={`/users/${
                        statsRecord.master && statsRecord.master._id
                      }`}
                    >
                      {statsRecord.master && statsRecord.master.lastName}{' '}
                      {statsRecord.master && statsRecord.master.firstName}{' '}
                      {statsRecord.master && statsRecord.master.middleName}
                    </Link>
                  </td>
                  <td>{statsRecord.count}</td>
                  <td>{statsRecord.cost}</td>
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
