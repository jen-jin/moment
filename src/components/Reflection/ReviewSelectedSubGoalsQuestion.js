import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class ReviewSelectedSubGoalsQuestion extends Component {
  constructor(props) {
    super(props);

    this.determineSubGoalsForGoal = this.determineSubGoalsForGoal.bind(this);
    this.renderSubGoal = this.renderSubGoal.bind(this);
  }

  determineSubGoalsForGoal(goal) {
    return this.props.subgoals.filter(subgoal => subgoal.goalID === goal.id);
  }

  renderSubGoal(goal) {
    const subgoals = this.determineSubGoalsForGoal(goal);

    if (subgoals.length > 0) {
      return subgoals.map(subgoal => <div>{subgoal.value}</div>);
    }

    return <div className="helper blue marginLeft10px">No tasks chosen.</div>;
  }

  render() {
    return (
      <div className="paddingTop30px">
        <Grid item>
          <div className="body">{this.props.question}</div>
        </Grid>
        <Grid item>
          {this.props.goals.length > 0 &&
            this.props.subgoals.length > 0 &&
            this.props.goals.map(goal => (
              <div className="helper blue marginLeft10px paddingTop10px">
                <span className="underline">{goal.value}</span>
                <br />
                {this.renderSubGoal(goal)}
              </div>
            ))}
          {this.props.subgoals.length === 0 && (
            <div className="helper blue marginLeft10px">Not answered.</div>
          )}
          <div className="helper blue marginLeft10px">
            {this.props.additional}
          </div>
        </Grid>
      </div>
    );
  }
}

export default ReviewSelectedSubGoalsQuestion;
