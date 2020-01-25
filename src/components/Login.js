import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import logo from '../img/logo.jpg'

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
    this.props.history.push("/dashboard");
  }

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div className="flex justify-between no-wrap">
        <img src={logo} alt="Logo" />
        <div>
          <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
          <div className="flex flex-column">
            {!login && (
              <input
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
                type="text"
                placeholder="Your name"
              />
            )}
            <input
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
              type="text"
              placeholder="Your email address"
            />
            <input
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
              type="password"
              placeholder="Choose a safe password"
            />
          </div>
          <div className="flex mt3">
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
            <div className="pointer mr2 button" onClick={this.handleLogin}>
              {login ? "login" : "create account"}
            </div>
            <div className="pointer button" onClick={this.handleLogin}>
              {login
                ? "need to create an account?"
                : "already have an account?"}
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
