import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
            <Button className={classes.logout} color="primary">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
  
export default withStyles(styles)(Appbar);
  