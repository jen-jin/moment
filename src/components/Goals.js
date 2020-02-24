import React, { Component } from "react";
import Sidebar from "./Sidebar";
import AddGoals from "./AddGoals";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      addGoal: false
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleAdd = () => {
    this.setState({ addGoal: true });
  }

  render() {
    return (
      <div className="goalsPage">
        <Grid container>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={8}>
            <div className="header paddingTop30px">Setting Goals</div>
            <Paper square>
              <Tabs value={this.state.value} indicatorColor="primary" textColor="primary" onChange={this.handleChange}>
                <Tab label="Current Goals" />
                <Tab label="Completed Goals" />
              </Tabs>
              <Button variant="contained" color="primary" style={{float: "right"}} onClick={this.handleAdd}>
                  + Add Goal
              </Button>
            </Paper>
            <div>
              { this.state.addGoal && <AddGoals /> }
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Goals;
