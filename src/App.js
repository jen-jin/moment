import React, { Component } from "react";
import Goals from "./components/Goals/Goals";
import CreateReflection from "./components/Reflection/CreateReflection";
import ViewReflection from "./components/Reflection/ViewReflection";
import Reflection from "./components/Reflection/Reflection";
import Resources from "./components/Resources/Resources";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import AuthContextProvider from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "./theme";
import { SnackbarProvider } from 'notistack';

const NavRoute = ({exact, path, component: Component}) => (
  <Route exact={exact} path={path} render={(props) => (
    <div style={{display: "flex"}}>
      <Appbar />
      <Sidebar />
      <main style={{ flexGrow: 1, padding: theme.spacing(5)}}>
        <Component {...props} />
      </main>
    </div>
  )}/>
)

class App extends Component {
  render() {
    return (
      <AuthContextProvider>
        <div className="App center">
          <div className="background-gray">
            <MuiThemeProvider theme={theme}>
              <SnackbarProvider maxSnack={1} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Switch>
                  <NavRoute exact path="/goals" component={Goals} />
                  <NavRoute exact path="/goals/complete" component={Goals} />
                  <NavRoute exact path="/reflection" component={Reflection} />
                  <NavRoute exact path="/reflection/createReflection" component={CreateReflection} />
                  <NavRoute exact path="/reflection/viewReflection" component={ViewReflection} />
                  <NavRoute exact path="/resources" component={Resources} />
                  <Route exact path="/" component={Login} />
                </Switch>
              </SnackbarProvider>
            </MuiThemeProvider>
          </div>
        </div>
      </AuthContextProvider>
    );
  }
}

export default App;
