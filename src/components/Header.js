import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          {authToken && ( // Show sidebar nav only if logged in
            <div className="flex">
              <Link to="/dashboard" className="ml1 no-underline black">
                Dashboard
              </Link>
              <br />
              <Link to="/goals" className="ml1 no-underline black">
                Goals
              </Link>
              <br />
              <Link to="/reflection" className="ml1 no-underline black">
                Reflection
              </Link>
              <br />
              <Link to="/resources" className="ml1 no-underline black">
                Resources
              </Link>
            </div>
          )}
          <div className="flex flex-fixed orange">
            {authToken && (
              <div
                className="ml1 pointer black"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  this.props.history.push(`/`);
                }}
              >
                Logout
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
