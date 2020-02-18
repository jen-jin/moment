import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import Goals from "./components/Goals";
import Reflection from "./components/Reflection";
import Resources from "./components/Resources";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import AuthContextProvider from "./context/AuthContext";

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <div className="App center">
          <div className="background-gray">
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/goals" component={Goals} />
              <Route exact path="/reflection" component={Reflection} />
              <Route exact path="/resources" component={Resources} />
              <Route exact path="/" component={Login} />
            </Switch>
          </div>
        </div>
      </AuthContextProvider>
    );
  }
}

export default App;
