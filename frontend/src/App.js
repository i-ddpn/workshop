import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import ServiceListScreen from './screens/ServiceListScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserCreateScreen from './screens/UserCreateScreen'
import UserScreen from './screens/UserScreen'
import UserEditScreen from './screens/UserEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/users/create' component={UserCreateScreen} />
            <Route path='/users/:id/edit' component={UserEditScreen} />
            <Route path='/users/:id' component={UserScreen} />
            <Route path='/users' component={UserListScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/' component={ServiceListScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
