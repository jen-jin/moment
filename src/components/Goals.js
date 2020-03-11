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
      addGoal: false,
      expanded: false
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
    this.setState({ expanded: false });
  }

  handleAdd = () => {
    this.setState({ addGoal: true });
  }

  dismiss() {
    this.setState({ addGoal: false });
  }

  handleOnAddEnd = () => {
    this.setState({ addGoal: false });
    this.setState({ value: "/goals" });
    this.setState({ expanded: true });
  }

  render() {
    var goalForm = <ViewGoals expanded={this.state.expanded} />;
    if (this.state.value == "/goals/complete")
      goalForm = <ViewCompletedGoals />;
    if (this.state.addGoal)
      goalForm = <AddGoals dismiss={ this.dismiss.bind(this) } onAddEnd={this.handleOnAddEnd} />;

    return (      
      <div className="goalsPage">
        <div className="header paddingTop60px">Setting Goals</div>
        <div className="helper paddingTop30px">
          <span className="bodyBold">
            “Our goals can only be reached through a vehicle of a plan, in which we must fervently believe, and upon which we must vigorously act. There is no other route to success.” - Pablo Picasso
          </span>
          <br />
          Use this space to set goals for you and your child. 
          We highly recommend setting goals with your speech-langugage pathologist for the first time.
        </div>
        <Grid container style={{paddingTop: 30}}>
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
        <Grid container style={{justifyContent: "center", alignItems: "center"}}>
          { goalForm }
        </Grid>
      </div>
    );
  }
}

export default Goals;
