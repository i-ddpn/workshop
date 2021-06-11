import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listClients, deleteClient } from '../actions/clientActions'

const ClientListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const clientList = useSelector((state) => state.clientList)
  const { loading, error, clients } = clientList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const clientDelete = useSelector((state) => state.clientDelete)
  const { success: successDelete } = clientDelete

  useEffect(() => {
    if (userInfo) {
      dispatch(listClients())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    dispatch(deleteClient(id))
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Клиенты</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to='/clients/create'>
            <Button className='my-3'>
              <i className='fas fa-plus'></i> Добавить клиента
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
              <th>ФИО</th>
              <th>Номер телефона</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>
                  <Link to={`/clients/${client._id}`}>
                    {client.lastName} {client.firstName} {client.middleName}
                  </Link>
                </td>
                <td>{client.phoneNumber}</td>
                <td>
                  <LinkContainer to={`/clients/${client._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(client._id)}
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

export default ClientListScreen
