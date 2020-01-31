import React, { Component } from 'react'
import Dashboard from './components/Dashboard'
import Goals from './components/Goals'
import Reflection from './components/Reflection'
import ReflectionTest2 from './components/ReflectionTest2'
import Resources from './components/Resources'
import Header from './components/Header'
import { Switch, Route } from 'react-router-dom'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <div className="center">
        <Header />
        <div className="background-gray">
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/goals" component={Goals} />
            <Route exact path="/reflection" component={Reflection} />
            <Route exact path="/reflection2" component={ReflectionTest2} />
            <Route exact path="/resources" component={Resources} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App