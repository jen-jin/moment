import React, { Component } from 'react';
import { Drawer, withStyles } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Link } from "react-router-dom";
import logo from "../img/logo.svg";
import { withRouter } from "react-router";

const drawerWidth = 220;

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
  constructor(props) {
    super(props);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const tabs = ["Dashboard", "Goals", "Reflection", "Resources"];
    return (
      <div className={classes.root}>
        <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{paper: classes.drawerPaper,}}>
          <div className={classes.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <Tabs orientation="vertical" value={this.props.location.pathname} onChange={this.handleChange} indicatorColor={"primary"}>
            {tabs.map((text) => (
              <Tab label={text} component={Link} to={"/" + text.toLowerCase()} value={"/" + text.toLowerCase()} />
            ))}
          </Tabs>
        </Drawer>
      </div>
    );
  }
}
  
export default withRouter(withStyles(styles)(Sidebar));
  