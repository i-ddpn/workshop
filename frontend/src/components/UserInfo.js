import React from 'react'
import { Row, Col } from 'react-bootstrap'

const UserInfo = ({ user }) => {
  return (
    <>
      <Row>
        <Col md='2'>Логин</Col>
        <Col md='3'>{user.login}</Col>
      </Row>
      <Row>
        <Col md='2'>ФИО</Col>
        <Col md='3'>
          {user.lastName} {user.firstName} {user.middleName}
        </Col>
      </Row>
      <Row>
        <Col md='2'>Должность</Col>
        <Col md='3'>{user.position && user.position.name}</Col>
      </Row>
      <Row>
        <Col md='2'>Администратор</Col>
        <Col md='3'>{user.isAdmin ? 'Да' : 'Нет'}</Col>
      </Row>
    </>
  )
}

export default UserInfo
