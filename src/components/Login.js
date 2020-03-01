import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import logo from "../img/login-banner.png";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../context/AuthContext";

class Login extends Component {
  static contextType = AuthContext;

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
    this.context.changeUser(this.state.name, 14); // This is temp
    this.props.history.push("/dashboard");
  }

  render() {
    const { login, email, password, name } = this.state;
    const { userName, userId } = this.context;

    return (
      <div className="gridTwoColumns fullscreen">
        <div className="twoColumnGridC1R1">
          <img src={logo} alt="Logo" style={{ width: "100%" }} />
        </div>
        <div
          className="twoColumnGridC2R1"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <div>
            <div className="display paddingBottom10px">
              {login ? "Log in" : "Sign Up"}
            </div>
            <div className="helper darkGray">
              Don't have an account? <span className="blue">Create Now</span>
            </div>
            <div className="body paddingTop30px">Email Address</div>
            <div className="username">
              <TextField
                id="standard-username-input"
                inputProps={{
                  style: {
                    fontFamily: "Open Sans",
                    fontSize: 15,
                    width: 450
                  }
                }}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="someone@example.com"
              />
            </div>
            <div className="body paddingTop30px">Password</div>
            <div className="password">
              <TextField
                id="standard-password-input"
                type="password"
                inputProps={{
                  style: {
                    fontFamily: "Open Sans",
                    fontSize: 15,
                    width: 450
                  }
                }}
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Enter your password"
              />
              <div className="flex paddingTop30px paddingLeft150px">
                <div
                  className="button buttonWidth100px borderRadius25px"
                  onClick={this.handleLogin}
                >
                  {login ? "Log in" : "create account"}
                </div>
                {login && (
                  <div className="helper blue paddingTop10px">
                    Forgot Password?
                  </div>
                )}
              </div>
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
