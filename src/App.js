import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import Goals from "./components/Goals";
import Reflection from "./components/Reflection";
import Resources from "./components/Resources";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import AuthContextProvider from "./context/AuthContext";
import Sidebar from "./components/Sidebar"
import Appbar from "./components/Appbar"

const NavRoute = ({exact, path, component: Component}) => (
  <Route exact={exact} path={path} render={(props) => (
    <div>
      <Appbar />
      <Sidebar />
      <Component {...props}/>
    </div>
  )}/>
)

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <div className="App center">
          <div className="background-gray">
            <Switch>
              <NavRoute exact path="/dashboard" component={Dashboard} />
              <NavRoute exact path="/goals" component={Goals} />
              <NavRoute exact path="/reflection" component={Reflection} />
              <NavRoute exact path="/resources" component={Resources} />
              <Route exact path="/" component={Login} />
            </Switch>
          </div>
        </div>
      </AuthContextProvider>
    );
  }
}

export default App;
