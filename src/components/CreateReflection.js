import React, { Component } from "react";
import StandardQuestion from "./StandardQuestion";
import MCQuestion from "./MCQuestion";
import PictureQuestion from "./PictureQuestion";
import DropDownChipQuestion from "./DropDownChipQuestion";
import ChipQuestion from "./ChipQuestion";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  DEFAULT_HEADERS,
  GOALS_PATH,
  SUCCESS,
  DATE_OPTIONS,
  ACTIVITY_OPTIONS
} from "../constants";

class CreateReflection extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      goals: [],
      moods: {
        excited: false,
        happy: false,
        good: false,
        meh: false,
        worried: false,
        sad: false,
        stressed: false,
        angry: false
      },
      selectedGoals: [],
      title: "Untitled Reflection",
      date: new Date().toLocaleTimeString("en-US", DATE_OPTIONS)
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackwards = this.moveBackwards.bind(this);
    this.changedTitle = this.changedTitle.bind(this);
    this.handleMoodSelection = this.handleMoodSelection.bind(this);
    this.handleGoalSelection = this.handleGoalSelection.bind(this);
    this.handleGoalUnSelection = this.handleGoalUnSelection.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context;

    console.log("User ID: " + userId);

    axios
      .get(GOALS_PATH + "/" + parseInt("14"), {
        // Temporarily changing it to 14 until we have the APIs sorted out
        headers: DEFAULT_HEADERS
      })
      .then(
        response => {
          if (response.data.status == SUCCESS && response.data.data != []) {
            this.setState({
              goals: response.data.data
            });
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

  // MARK: - Handling Mood Question
  async handleMoodSelection(newMoods) {
    await this.setState({
      // NOTE: Await is necessary here
      moods: newMoods
    });
  }

  // MARK: - Handling Goal Question
  // TODO: Two issues
  // 1. Second select for update ()
  // 2. Goals adding regardless if it is already there
  handleGoalSelection(newGoals) {
    console.log("Selected goals before:" + this.state.selectedGoals);
    this.setState({
      selectedGoals: [...this.state.selectedGoals, newGoals]
    });

    console.log("Selected goals after:" + this.state.selectedGoals);
  }

  handleGoalUnSelection(goal) {
    // Remove Goal
  }

  // MARK: - Navigating Sections
  moveForward() {
    this.setState({ step: this.state.step + 1 });
  }

  moveBackwards() {
    this.setState({ step: this.state.step - 1 });
  }

  render() {
    const { step, goals, title, date } = this.state;
    const numSteps = 4;

    console.log("Goals length " + goals.length);

    return (
      <div className="createReflection">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item style={{ width: 950 }}>
            <div className="paddingTop30px" />
            <TextField
              id="standard-basic"
              placeholder={title}
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
            {step == 1 && (
              <PictureQuestion onMoodChange={this.handleMoodSelection} />
            )}

            {step == 2 && goals.length > 0 && (
              <DropDownChipQuestion
                question="2. Did you work on any of these goals today?"
                helper="Choose as many as you like"
                placeholder="Select goals"
                content={goals}
                key1="goal"
                key2="goal"
                onSelection={this.handleGoalSelection}
                onUnSelection={this.handleGoalUnSelection}
              />
            )}
            {step == 2 &&
            goals.length == 0 && ( // In the case of network failure
                <StandardQuestion
                  question="2. What goals did you work on today?"
                  placeholder="Type your answer here"
                />
              )}
            {/* {step == 2 && goals.length > 0 && ( // TODO: Once subgoals path is ready, finish question
              <DropDownChipQuestion
                question="3. Did you work on any of these tasks today?"
                helper="Choose as many as you like"
                placeholder="Select tasks"
                content={goals}
                key1="subgoal"
                onSelection={this.handleGoalSelection}
                onUnSelection={this.handleGoalUnSelection}
              />
            )}             */}

            {step == 3 && (
              <ChipQuestion
                question="3. What activities did you have with your child today?"
                helper="Choose as many as you like"
                options={ACTIVITY_OPTIONS}
              />
            )}
            {step == 3 && <StandardQuestion placeholder="Add New Activities" />}

            {step == 4 && (
              <div>
                <StandardQuestion question="What can be improved?" />
              </div>
            )}

            <Grid
              container
              item
              spacing={3}
              direction="row"
              alignItems="flex-end"
              justify="flex-end"
            >
              {step !== 1 && (
                <Grid item>
                  <div
                    className="buttonOutlined buttonWidth100px borderRadius25px marginTop30px"
                    onClick={this.moveBackwards}
                  >
                    Back
                  </div>
                </Grid>
              )}
              {step !== numSteps && (
                <Grid item>
                  <div
                    className="button buttonWidth100px borderRadius25px marginTop30px"
                    onClick={this.moveForward}
                  >
                    Next
                  </div>
                </Grid>
              )}
              {step == 4 && (
                <Grid item>
                  <div
                    className="button buttonWidth100px borderRadius25px marginTop30px"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CreateReflection;
