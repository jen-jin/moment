import React, { Component } from "react";
import { Prompt } from "react-router";
import StandardQuestion from "./StandardQuestion";
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
  ACTIVITY_OPTIONS,
  ACTIVITY_LOCATION_OPTIONS,
  DEFAULT_REFLECTION_TITLE,
  DEFAULT_TEXTBOX_PLACEHOLDER
} from "../constants";

class CreateReflection extends Component {
  static contextType = AuthContext;

  // MARK: - Constructor
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
      selectedSubGoals: [],
      selectedActivities: [],
      additionalActivities: "",
      selectedActivityLocations: [],
      additionalActivityLocations: "",
      activityCommunication: "",
      intendedMessage: "",
      communication: "",
      learningsGood: "",
      learningsBad: "",
      title: DEFAULT_REFLECTION_TITLE,
      date: new Date().toLocaleTimeString("en-US", DATE_OPTIONS),
      completedReflection: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackwards = this.moveBackwards.bind(this);
    this.changedTitle = this.changedTitle.bind(this);
    this.handleMoodSelection = this.handleMoodSelection.bind(this);
    this.handleGoalSelection = this.handleGoalSelection.bind(this);
    this.handleActivitySelection = this.handleActivitySelection.bind(this);
    this.handleAdditionalActivities = this.handleAdditionalActivities.bind(
      this
    );
    this.handleActivityLocationSelection = this.handleActivityLocationSelection.bind(
      this
    );
    this.handleAdditionalActivityLocations = this.handleAdditionalActivityLocations.bind(
      this
    );
    this.handleActivityCommunication = this.handleActivityCommunication.bind(
      this
    );
    this.handleIntendedMessageCommunication = this.handleIntendedMessageCommunication.bind(
      this
    );
    this.handleCommunication = this.handleCommunication.bind(this);
    this.handleGoodLearnings = this.handleGoodLearnings.bind(this);
    this.handleBadLearnings = this.handleBadLearnings.bind(this);
  }

  // MARK: - Lifecycle
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

  // MARK: - Reflection Changes
  changedTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleSubmit() {
    // TODO: Call API
    this.setState({
      completedReflection: true
    }, () => this.navigateToReflection())
  }

  async navigateToReflection() {
    await this.props.history.replace("/reflection");
  }

  // MARK: - Handling Mood Question
  async handleMoodSelection(newMoods) {
    await this.setState({
      // NOTE: Await is necessary here
      moods: newMoods
    });
  }

  // MARK: - Handling Goal Question
  async handleGoalSelection(newGoals) {
    await this.setState({
      // NOTE: Await is necessary here
      selectedGoals: newGoals
    });
  }

  // MARK: - Activity Selection
  async handleActivitySelection(newActivities) {
    await this.setState({
      // NOTE: Await is necessary here
      selectedActivities: newActivities
    });
  }

  async handleAdditionalActivities(additionalActivities) {
    await this.setState({
      // NOTE: Await is necessary here
      additionalActivities: additionalActivities
    });
  }

  // MARK: - Activity Location Selection
  async handleActivityLocationSelection(newLocations) {
    await this.setState({
      // NOTE: Await is necessary here
      selectedActivityLocations: newLocations
    });
  }

  async handleAdditionalActivityLocations(additionalLocations) {
    await this.setState({
      // NOTE: Await is necessary here
      additionalActivityLocations: additionalLocations
    });
  }

  // MARK: - Communication During Activitiy
  async handleActivityCommunication(communication) {
    await this.setState({
      // NOTE: Await is necessary here
      activityCommunication: communication
    });
  }

  // MARK: - Intended Message During Activity
  async handleIntendedMessageCommunication(message) {
    await this.setState({
      // NOTE: Await is necessary here
      intendedMessage: message
    });
  }

  // MARK: - General Communication During Activity
  async handleCommunication(message) {
    await this.setState({
      // NOTE: Await is necessary here
      communication: message
    });
  }

  // MARK: - Good Learnings
  async handleGoodLearnings(learning) {
    await this.setState({
      // NOTE: Await is necessary here
      learningsGood: learning
    });
  }

  // MARK: - Bad Learnings
  async handleBadLearnings(learning) {
    await this.setState({
      // NOTE: Await is necessary here
      learningsBad: learning
    });
  }

  // MARK: - Navigating Sections
  moveForward() {
    this.setState({ step: this.state.step + 1 });
  }

  moveBackwards() {
    this.setState({ step: this.state.step - 1 });
  }

  // MARK: - Render
  render() {
    const {
      step,
      goals,
      date,
      completedReflection,
      moods,
      selectedGoals,
      selectedSubGoals,
      selectedActivities,
      additionalActivities,
      selectedActivityLocations,
      additionalActivityLocations,
      activityCommunication,
      intendedMessage,
      communication,
      learningsGood,
      learningsBad
    } = this.state;

    const numSteps = 5;

    return (
      <React.Fragment>
        <Prompt
          when={!completedReflection}
          message="You have unsaved changes, are you sure you want to leave?"
        />
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
                placeholder={DEFAULT_REFLECTION_TITLE}
                inputProps={{
                  style: { fontFamily: "Open Sans", fontSize: 24, width: 500 }
                }}
                onChange={this.changedTitle}
              />
              <div className="helper paddingTop10px">{date}</div>
            </Grid>
            <Grid item>
              <div className="helper paddingTop10px">
                {step == 1 && "Let's get started! "}
                {step < numSteps && step > 1 && "Keeping going! "}
                {step == numSteps && "You're almost there! "}                
                You're on section {step} of {numSteps}.
              </div>
            </Grid>
            <Grid item>
              {step == 1 && (
                <PictureQuestion
                  onMoodChange={this.handleMoodSelection}
                  moods={moods}
                />
              )}

              {step == 2 && goals.length > 0 && (
                <DropDownChipQuestion
                  question="2. Did you work on any of these goals today?"
                  helper="Choose as many as you like"
                  placeholder="Select goals"
                  content={goals}
                  key1="goal"
                  key2="goal"
                  onSelectionChange={this.handleGoalSelection}
                  selected={selectedGoals}
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
                <StandardQuestion
                  question="3. PLACE HOLDER FOR SUBGOALS QUESTION"
                  placeholder="Additional Activities"
                  content={additionalActivities}
                  onContentChange={this.handleAdditionalActivities}
                />
              )}

              {step == 4 && (
                <ChipQuestion
                  question={
                    selectedSubGoals.length == 0
                      ? "4. What activities did you have with your child today?"
                      : "4. What activity did you do with your child when you were working on the selected tasks?"
                  }
                  helper="Choose as many as you like"
                  options={ACTIVITY_OPTIONS}
                  selectedOptions={selectedActivities}
                  onSelectionChange={this.handleActivitySelection}
                />
              )}
              {step == 4 && (
                <StandardQuestion
                  placeholder="Additional Activities"
                  content={additionalActivities}
                  onContentChange={this.handleAdditionalActivities}
                />
              )}
              {step == 4 && (
                <ChipQuestion
                  question="5. Where did you have the activity today?"
                  helper="Choose as many as you like"
                  options={ACTIVITY_LOCATION_OPTIONS}
                  selectedOptions={selectedActivityLocations}
                  onSelectionChange={this.handleActivityLocationSelection}
                />
              )}
              {step == 4 && (
                <StandardQuestion
                  placeholder="Additional Activity Locations"
                  content={additionalActivityLocations}
                  onContentChange={this.handleAdditionalActivityLocations}
                />
              )}
              {step == 4 && (
                <StandardQuestion
                  question="6. How did your child communicate during the activity?"
                  placeholder={DEFAULT_TEXTBOX_PLACEHOLDER}
                  content={activityCommunication}
                  onContentChange={this.handleActivityCommunication}
                />
              )}
              {step == 4 && (
                <StandardQuestion
                  question="7. What was the intended message from your child?"
                  placeholder={DEFAULT_TEXTBOX_PLACEHOLDER}
                  content={intendedMessage}
                  onContentChange={this.handleIntendedMessageCommunication}
                />
              )}
              {step == 4 && (
                <StandardQuestion
                  question="8. How did you communicate with your child?"
                  placeholder={DEFAULT_TEXTBOX_PLACEHOLDER}
                  content={communication}
                  onContentChange={this.handleCommunication}
                />
              )}

              {step == 5 && (
                <StandardQuestion
                  question="9. What went well during the activity today?"
                  helper="Take a moment to reflect on the activity that went well, how do you know it went well and what you should keep doing in the next session?"
                  placeholder={DEFAULT_TEXTBOX_PLACEHOLDER}
                  content={learningsGood}
                  onContentChange={this.handleGoodLearnings}
                />
              )}
              {step == 5 && (
                <StandardQuestion
                  question="10. What didn't go well during the activity today?"
                  helper="Take a moment and reflect on the time you ran into an obstacle during the activity. What was that obstacle? How did it occur? What are the possible actions you could do to prevent it from happening again in the future?"
                  placeholder={DEFAULT_TEXTBOX_PLACEHOLDER}
                  content={learningsBad}
                  onContentChange={this.handleBadLearnings}
                />
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
                {step == numSteps && (
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
      </React.Fragment>
    );
  }
}

export default CreateReflection;
