import React, { Component } from "react";
import StandardQuestion from "./StandardQuestion";
import MCQuestion from "./MCQuestion";
import Grid from "@material-ui/core/Grid";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { DEFAULT_HEADERS, GOALS_PATH, SUCCESS } from "../constants";

class Reflection extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      goals: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackwards = this.moveBackwards.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context;

    axios
      .get(GOALS_PATH + "/" + parseInt(userId), {
        headers: DEFAULT_HEADERS
      })
      .then(
        response => {
          if (response.data.status == SUCCESS && response.data.data != []) {
            // Store the goal title
            // TODO: Figure out a way to store id too
            var tempGoals = [];
            for (const goal of response.data.data) {
              tempGoals.push(goal["goal"]["goal"]);
            }

            this.setState({
              goals: tempGoals
            });

            console.log("Goals: " + this.state.goals);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  handleSubmit() {
    // Submit
  }

  moveForward() {
    this.setState({ step: this.state.step + 1 });
  }

  moveBackwards() {
    this.setState({ step: this.state.step - 1 });
  }

  // NOTE: You can use chips from material-ui for a different select
  render() {
    const { step, goals } = this.state;
    const numSteps = 4;

    return (
      <div className="reflectionPage">
        {step !== 1 && (
          <div
            className="button borderRadius25px marginTop30px marginLeft30px"
            onClick={this.moveBackwards}
          >
            Back
          </div>
        )}
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={6}>
            <div className="header paddingTop30px">Reflection Page</div>
            <div className="body paddingTop10px">Step {step} of 4</div>
            {step == 1 && goals.length > 0 && (
              <MCQuestion
                question="Were you trying to complete any of these goals?"
                option1={goals[0]}
                option2={goals[1]}
                option3={goals[2]}
                option4={goals[3]}
                option5={goals[4]}
              />
            )}          
            {step == 1 && (
              <MCQuestion
                question="What activity was done?"
                option1="Learning vocabulary"
                option2="Learning AAC"
              />
            )}
            {step == 2 && <StandardQuestion question="What went well?" />}
            {step == 3 && (
              <MCQuestion
                question="What didn't go well?"
                option1="My child did not interact with the device"
                option2="The device was not working"
              />
            )}
            {step == 4 && (
              <div>
                <StandardQuestion question="What can be improved?" />
                <div
                  className="button borderRadius25px marginTop30px"
                  onClick={this.handleSubmit}
                >
                  Submit
                </div>
              </div>
            )}
            {step !== numSteps && (
              <div
                className="button borderRadius25px marginTop30px"
                onClick={this.moveForward}
              >
                Next
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Reflection;
