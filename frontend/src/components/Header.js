import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Workshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo &&
                userInfo.position &&
                userInfo.position.name === 'Мастер' && (
                  <LinkContainer to='/report/my'>
                    <Nav.Link>
                      <i className='fas fa-chart-bar'></i> Отчёт
                    </Nav.Link>
                  </LinkContainer>
                )}
              {userInfo &&
                userInfo.position &&
                userInfo.position.name === 'Директор' && (
                  <LinkContainer to='/stats'>
                    <Nav.Link>
                      <i className='fas fa-chart-line'></i> Статистика
                    </Nav.Link>
                  </LinkContainer>
                )}
              {userInfo && (
                <LinkContainer to='/clients'>
                  <Nav.Link>
                    <i className='fas fa-person-booth'></i> Клиенты
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && (
                <LinkContainer to='/orders'>
                  <Nav.Link>
                    <i className='fas fa-list'></i> Заказы
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <LinkContainer to='/users'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Пользователи
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.firstName} id='login'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Профиль</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Выйти
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-sign-in-alt'></i> Войти
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
