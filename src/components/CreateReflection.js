import React, { Component } from "react";
import StandardQuestion from "./StandardQuestion";
import MCQuestion from "./MCQuestion";
import PictureQuestion from "./PictureQuestion";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  DEFAULT_HEADERS,
  GOALS_PATH,
  SUCCESS,
  DATE_OPTIONS
} from "../constants";

class CreateReflection extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      goals: [],
      title: "Untitled Reflection",
      date: new Date().toLocaleTimeString("en-US", DATE_OPTIONS)
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackwards = this.moveBackwards.bind(this);
    this.changedTitle = this.changedTitle.bind(this);
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

  changedTitle() {
    // handle changed title
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
    const { step, goals, title, date } = this.state;
    const numSteps = 4;

    return (
      <div className="createReflection">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item>
            <div className="paddingTop30px" />
            <TextField
              id="standard-basic"
              placeholder="Untitled Reflection"
              fullWidth="true"
              inputProps={{
                style: { fontFamily: "Open Sans", fontSize: 24, width: 500 }
              }}
              onChange={this.changedTitle}
            />
            <div className="helper paddingTop10px">{date}</div>
          </Grid>
          <Grid item>
            <div className="helper paddingTop10px">
              Let's get started! You're on section {step} of 4.             
            </div>
          </Grid>
          <Grid item>
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
            {step == 1 && <PictureQuestion />}
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
                  className="button buttonWidth100px borderRadius25px marginTop30px rightAlign"
                  onClick={this.handleSubmit}
                >
                  Submit
                </div>
              </div>
            )}
            {step !== numSteps && (
              <div
                className="button buttonWidth100px borderRadius25px marginTop30px rightAlign"
                onClick={this.moveForward}
              >
                Next
              </div>
            )}
            {step !== 1 && (
              <div
                className="button buttonWidth100px borderRadius25px marginTop30px"
                onClick={this.moveBackwards}
              >
                Back
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CreateReflection;
