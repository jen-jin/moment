import React, { createContext, Component } from "react";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    userName: "sam123",
    userId: "14"
  }

  changeUser = (name, id) => {
    this.setState({
      userName: name,
      userId: id
    })
  }
  
  render() {
    return (
      <AuthContext.Provider value={{...this.state, changeUser: this.changeUser}}>
        {this.props.children}
      </AuthContext.Provider>
    );

  }
} 

export default AuthContextProvider;