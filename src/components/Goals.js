import React, { Component } from "react";
import AddGoals from "./AddGoals";
import ViewGoals from "./ViewGoals";
import Grid from "@material-ui/core/Grid";
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

  dismiss() {
    this.setState({ addGoal: false });
  }

  render() {
    var goalForm = <ViewGoals />;
    if (this.state.addGoal)
      goalForm = <AddGoals dismiss={ this.dismiss.bind(this) } />;

    return (      
      <div className="goalsPage">
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={8}>
            <div className="header paddingTop30px">Setting Goals</div>
            <Grid container>
              <Grid item xs={8}>
                <Tabs value={this.state.value} indicatorColor="primary" textColor="primary" onChange={this.handleChange}>
                  <Tab label="Current Goals" />
                  <Tab label="Completed Goals" />
                </Tabs>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" style={{float: "right"}} onClick={this.handleAdd}>
                  + Add Goal
                </Button>
              </Grid>
            </Grid>
            <div>
              { goalForm }
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Goals;
