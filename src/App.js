import React, { Component } from 'react'
import Dashboard from './components/Dashboard'
import Goals from './components/Goals'
import Reflection from './components/Reflection'
import Resources from './components/Resources'
import Header from './components/Header'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/goals" component={Goals} />
            <Route exact path="/reflection" component={Reflection} />
            <Route exact path="/resources" component={Resources} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App