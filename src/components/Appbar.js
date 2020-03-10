import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from "../constants";

const styles = theme => ({
  appbar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0,0,0,0.12)",
    width: "calc(100% - ${DRAWER_WIDTH}px)",
    marginLeft: DRAWER_WIDTH,
  },
  logout: {
    marginLeft: "auto"
  }
});

class Appbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.appbar} position="fixed" color="transparent">
        <Toolbar>
          <NavLink className={classes.logout} color="primary" to="/">Logout</NavLink>
        </Toolbar>
      </AppBar>
    );
  }
}
  
export default withStyles(styles)(Appbar);
  