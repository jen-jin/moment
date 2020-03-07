import React, { Component } from "react";
import AddGoals from "./AddGoals";
import ViewGoals from "./ViewGoals";
import ViewCompletedGoals from "./ViewCompletedGoals";
import Grid from "@material-ui/core/Grid";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "/goals",
      addGoal: false
    };
  }

  componentDidMount() {
    if(this.props.location.pathname == '/goals') {
      this.setState({value: "/goals"})
    } else {
      if (this.props.location.pathname == '/goals/complete') {
        this.setState({value: "/goals/complete"})
      }
    }
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

  handleOnAddEnd = () => {
    this.setState({ addGoal: false });
    this.setState({value: "/goals"});
  }

  render() {
    var goalForm = <ViewGoals />;
    if (this.state.value == "/goals/complete")
      goalForm = <ViewCompletedGoals />;
    if (this.state.addGoal)
      goalForm = <AddGoals dismiss={ this.dismiss.bind(this) } onAddEnd={this.handleOnAddEnd} />;

    return (      
      <div className="goalsPage">
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={8}>
            <div className="header paddingTop30px">Setting Goals</div>
            <Grid container>
              <Grid item xs={8}>
                <Tabs value={this.state.value} onChange={this.handleChange}>
                  <Tab label="Current Goals" value="/goals" component={Link} to={"/goals"} />
                  <Tab label="Completed Goals" value="/goals/complete" component={Link} to={"/goals/complete"} />
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
