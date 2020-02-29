import React, { Component } from 'react';
import { Drawer, withStyles } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Link } from "react-router-dom";
import logo from "../img/logo.svg";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8
  }
});

class Sidebar extends Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{paper: classes.drawerPaper,}}>
            <div className={classes.logo}>
              <img src={logo} alt="Logo" />
            </div>
            <Tabs orientation="vertical" value={this.state.value} onChange={this.handleChange} indicatorColor={"primary"}>
              {["Dashboard", "Goals", "Reflection", "Resources"].map((text) => (
                <Tab label={text} component={Link} to={"/" + text.toLowerCase()} />
              ))}
            </Tabs>
        </Drawer>
      </div>
    );
  }
}
  
export default withStyles(styles)(Sidebar);
  