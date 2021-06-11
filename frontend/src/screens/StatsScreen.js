import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col } from 'react-bootstrap'

const StatsScreen = () => {
  return (
    <>
      <Row>
        <Col md='3'>
          <h1>Статистика</h1>
        </Col>
        <Col md='1'>
          <LinkContainer to='/stats/masters'>
            <Button className='my-3'>Мастеры</Button>
          </LinkContainer>
        </Col>
        <Col md='1'>
          <LinkContainer to='/stats/managers'>
            <Button className='my-3'>Менеджеры</Button>
          </LinkContainer>
        </Col>
      </Row>
    </>
  )
}

export default StatsScreen
