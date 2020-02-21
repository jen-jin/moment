import React, { Component } from 'react';
import { List, ListItem, ListItemText, Drawer, withStyles } from '@material-ui/core';
import { Link } from "react-router-dom";

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
});

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{paper: classes.drawerPaper,}}>
          <List>
            {['Dashboard', 'Goals', 'Reflection', 'Resources'].map((text) => (
              <ListItem key={text} component={Link} to={"/" + text.toLowerCase()}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}
  
export default withStyles(styles)(Sidebar);
  