import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0,0,0,0.12)"
  },
  logout: {
    marginLeft: "auto"
  }
});

class Appbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="static" color="transparent">
          <Toolbar>
            <NavLink className={classes.logout} color="primary" to="/">Logout</NavLink>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
  
export default withStyles(styles)(Appbar);
  