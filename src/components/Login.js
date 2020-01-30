import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import logo from "../img/logo.jpg";
import TextField from '@material-ui/core/TextField';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true, // switch between Login and SignUp
      email: "",
      password: "",
      name: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({ login: !this.login });
    this.props.history.push("/reflection");
  }

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div className="gridTwoColumns fullscreen">
        <div className="twoColumnGridC1R1">
          <img src={logo} alt="Logo" />
        </div>
        <div className="twoColumnGridC2R1">
          <div>
            <h4 className="display">{login ? "Log in" : "Sign Up"}</h4>
            <div className="body">Email Address</div>
            <div className="username">
              <TextField 
                id="standard-username-input"
                inputProps={{
                  style: {fontFamily: 'Open Sans', fontSize: 15, width: 300} 
                }}
                onChange= {e => this.setState({ email: e.target.value })}
                placeholder="someone@example.com"
              />
            </div>
            <div className="body paddingTop30px">Password</div>
            <div className="password">
            <TextField 
                id="standard-password-input"
                type="password"
                inputProps={{
                  style: {fontFamily: 'Open Sans', fontSize: 15, width: 300} 
                }}
                onChange= {e => this.setState({ password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>
            <div className="flex paddingTop30px">
              {/* TODO: Uncomment when server is ready */}
              {/* <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>                     */}
              {/* TODO: Remove div below when server is ready */}
              <div
                className="button borderRadius25px"
                onClick={this.handleLogin}
              >
                {login ? "Log in" : "create account"}
              </div>
              {login && <div className="helper blue paddingTop10px">Forgot Password?</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  _confirm = async data => {
    // TODO: Uncomment when server is ready
    // const { token } = this.state.login ? data.login : data.signup

    const { token } = "temp1234";
    this._saveUserData(token);
    this.props.history.push("/");
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default Login;
