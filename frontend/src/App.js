import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import ServiceListScreen from './screens/ServiceListScreen'

import LoginScreen from './screens/LoginScreen'

import ProfileScreen from './screens/ProfileScreen'

import UserListScreen from './screens/UserListScreen'
import UserScreen from './screens/UserScreen'
import UserCreateScreen from './screens/UserCreateScreen'
import UserEditScreen from './screens/UserEditScreen'

import OrderListScreen from './screens/OrderListScreen'
import OrderScreen from './screens/OrderScreen'
import OrderCreateScreen from './screens/OrderCreateScreen'
import OrderEditScreen from './screens/OrderEditScreen'

import ClientListScreen from './screens/ClientListScreen'
import ClientScreen from './screens/ClientScreen'
import ClientCreateScreen from './screens/ClientCreateScreen'
import ClientEditScreen from './screens/ClientEditScreen'

import StatsScreen from './screens/StatsScreen'
import StatsMastersScreen from './screens/StatsMastersScreen'
import StatsManagersScreen from './screens/StatsManagersScreen'

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

            <Route path='/orders/create' component={OrderCreateScreen} />
            <Route path='/orders/:id/edit' component={OrderEditScreen} />
            <Route path='/orders/:id' component={OrderScreen} />
            <Route path='/orders' component={OrderListScreen} />

            <Route path='/clients/create' component={ClientCreateScreen} />
            <Route path='/clients/:id/edit' component={ClientEditScreen} />
            <Route path='/clients/:id' component={ClientScreen} />
            <Route path='/clients' component={ClientListScreen} />

            <Route path='/stats/masters' component={StatsMastersScreen} />
            <Route path='/stats/managers' component={StatsManagersScreen} />
            <Route path='/stats' component={StatsScreen} />

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
