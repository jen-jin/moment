import React, { Component } from "react";
import { Prompt } from "react-router";
import StandardQuestion from "./StandardQuestion";
import PictureQuestion from "./PictureQuestion";
import ScaleQuestion from "./ScaleQuestion";
import DropDownChipQuestion from "./DropDownChipQuestion";
import ChipQuestion from "./ChipQuestion";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  DEFAULT_HEADERS,
  GOALS_PATH,
  SUBGOALS_PATH,
  SUCCESS,
  DATE_OPTIONS,
  ACTIVITY_OPTIONS,
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
      subgoals: [],
      moods: {
        excited: false,
        happy: false,
        good: false,
        okay: false,
        worried: false,
        sad: false,
        stressed: false,
        angry: false
      },
      communication: {
        veryIneffectively: false,
        ineffectively: false,
        somewhatEffectively: false,
        effectively: false,
        veryEffectively: false
      },
      support: {
        veryIneffectively: false,
        ineffectively: false,
        somewhatEffectively: false,
        effectively: false,
        veryEffectively: false
      },
      selectedGoals: [],
      selectedGoalsID: [],
      networkFailGoals: "",
      networkFailSubGoals: "",
      selectedSubGoals: [],
      selectedActivities: [],
      additionalActivities: "",
      learningsGood: "",
      learningsBad: "",
      additionalNotes: "",
      title: DEFAULT_REFLECTION_TITLE,
      date: new Date().toLocaleTimeString("en-US", DATE_OPTIONS),
      previewStep: false,
      completedReflection: false
    };

    this.fetchSubGoals = this.fetchSubGoals.bind(this);
    this.fetchSubGoalsHelper = this.fetchSubGoalsHelper.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackwards = this.moveBackwards.bind(this);
    this.changedTitle = this.changedTitle.bind(this);
    this.handleMoodSelection = this.handleMoodSelection.bind(this);
    this.handleCommunicationSelection = this.handleCommunicationSelection.bind(
      this
    );
    this.handleSupportSelection = this.handleSupportSelection.bind(this);
    this.handleGoalSelection = this.handleGoalSelection.bind(this);
    this.handleSubGoalSelection = this.handleSubGoalSelection.bind(this);
    this.handleActivitySelection = this.handleActivitySelection.bind(this);
    this.handleAdditionalActivities = this.handleAdditionalActivities.bind(
      this
    );
    this.handleAdditionalNotes = this.handleAdditionalNotes.bind(this);
    this.handleGoodLearnings = this.handleGoodLearnings.bind(this);
    this.handleBadLearnings = this.handleBadLearnings.bind(this);
    this.handleNetworkFailGoals = this.handleNetworkFailGoals.bind(this);
    this.handleNetworkFailSubGoals = this.handleNetworkFailSubGoals.bind(this);
    this.goalsToSubgoals = this.goalsToSubgoals.bind(this);
  }

  // MARK: - Lifecycle
  componentDidMount() {
    const { userId } = this.context;

    console.log("User ID: " + userId);

    axios
      .get(GOALS_PATH + "/" + parseInt("14") + "/incomplete", {
        // Temporarily changing it to 14 until we have the APIs sorted out
        headers: DEFAULT_HEADERS
      })
      .then(
        response => {
          if (response.data.status == SUCCESS) {
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

  // MARK: - Fetching subgoals

  fetchSubGoalsHelper() {
    this.state.selectedGoalsID.map(id => {
      console.log("Fetching ID: " + id)
      this.fetchSubGoals(id)
    })    
  }

  async fetchSubGoals(goalID) {
    await axios
      .get(SUBGOALS_PATH + "/" + goalID, {
        headers: DEFAULT_HEADERS
      })
      .then(
        response => {
          if (response.data.status == SUCCESS) {
            console.log("Subgoals: " + response.data.data[0].subgoal);

            // Checking if subgoals already exist before adding (same goalID)
            if (
              this.state.subgoals.filter(subgoal => subgoal.goal_id == goalID)
                .length == 0
            ) {
              this.setState({
                subgoals: this.state.subgoals.concat(response.data.data)
              });
            }

            console.log("Subgoals Count: " + this.state.subgoals.length);
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
    this.setState(
      {
        completedReflection: true,
        displayPrompt: true
      },
      () => this.navigateToReflection()
    );
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

  // MARK: - Handling Communication Scale Question
  async handleCommunicationSelection(responses) {
    await this.setState({
      // NOTE: Await is necessary here
      communication: responses
    });
  }  
  
  // MARK: - Handling Support Scale Question
  async handleSupportSelection(responses) {
    await this.setState({
      // NOTE: Await is necessary here
      support: responses
    });
  }   

  // MARK: - Handling Goal Question
  async handleGoalSelection(newGoals) {
    await this.setState({
      // NOTE: Await is necessary here
      selectedGoals: newGoals
    });
  }

  // MARK: - Handling Goal Question
  async handleSubGoalSelection(newSubGoals) {
    console.log("New Sub Goals: " + newSubGoals.length);
    await this.setState({
      // NOTE: Await is necessary here
      selectedSubGoals: newSubGoals
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

  // MARK: - Additional Notes
  async handleAdditionalNotes(notes) {
    await this.setState({
      // NOTE: Await is necessary here
      additionalNotes: notes
    });
  }

  // MARK: - Network Fails
  async handleNetworkFailGoals(goals) {
    await this.setState({
      // NOTE: Await is necessary here
      networkFailGoals: goals
    });
  }

  async handleNetworkFailSubGoals(subgoals) {
    await this.setState({
      // NOTE: Await is necessary here
      networkFailSubGoals: subgoals
    });
  }

  // MARK: - Goals to Subgoals
  // TODO: Bug, should be updating selectedGoalIDs with selectedGoals
  async goalsToSubgoals() {
    console.log("Matching selected goals");
    await this.state.selectedGoals.map(goalTitle => {
      const selectedGoalInfo = this.state.goals.filter(
        goal => goal["goal"]["goal"] == goalTitle
      ); // Find goal with the same title, limitation
      const selectedGoalID = selectedGoalInfo[0]["goal"]["id"]; // Assuming only one match, limitation

      console.log("Selected Goal ID: " + selectedGoalID);
      if (!this.state.selectedGoalsID.includes(selectedGoalID)) {
        // Update selected goal IDs
        console.log("Does not have ID");
        this.setState({
          selectedGoalsID: this.state.selectedGoalsID.concat(selectedGoalID)
        });
      }
    });

    await this.fetchSubGoalsHelper();
    this.setState({ step: this.state.step + 1 });
  }

  // MARK: - Navigating Sections
  moveForward() {    
    // If step == 2, goals question, fetch subgoals
    if (this.state.step == 2) {
      console.log("Goals to subgoals");
      console.log("Current subgoals: " + this.state.subgoals.length);
      this.goalsToSubgoals();
    } else {
      // If step == 5, next step is preview after going forward
      this.setState({ 
        step: this.state.step + 1,
        previewStep: this.state.step == 5 
      });      
    }    
  }

  moveBackwards() {
    // If step == 6, NOT preview anymore after going back    
      this.setState({ 
        step: this.state.step - 1,
        previewStep: this.state.step == 6 ? !this.state.previewStep : false
      });        
  }

  // MARK: - Render
  render() {
    const {
      step,
      goals,
      subgoals,
      date,
      completedReflection,
      moods,
      communication,
      support,
      selectedGoals,
      selectedGoalsID,
      networkFailGoals,
      networkFailSubGoals,
      selectedSubGoals,
      selectedActivities,
      additionalActivities,
      learningsGood,
      learningsBad,
      additionalNotes,
      previewStep
    } = this.state;

    const numSteps = 6;

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
            {previewStep && (
              <Grid item>
                <div className="header paddingTop10px">Review</div>
              </Grid>
            )}
            <Grid item>
              <div className="helper paddingTop10px">
                {step == 1 && "Let's get started! "}
                {step < numSteps && step > 1 && "Keep going! "}
                {step == numSteps && "You're almost there! "}
                You're on section {step} of {numSteps}.
              </div>
            </Grid>
            <Grid item>
              {(step == 1 || previewStep) && (
                <PictureQuestion
                  onMoodChange={this.handleMoodSelection}
                  moods={moods}
                />
              )}

              {(step == 2 || previewStep) && goals.length > 0 && (
                  <DropDownChipQuestion
                    question="2. Did you work on any of these goals?"
                    helper="Choose as many as you like"
                    placeholder="Select goals"
                    subheading={null}
                    content={goals}
                    key1="goal"
                    key2="goal"
                    onSelectionChange={this.handleGoalSelection}
                    selected={selectedGoals}
                  />
                )}
              {(step == 2 || previewStep) &&
              goals.length == 0 && ( // In the case of network failure or no goals available
                  <StandardQuestion
                    question="2. What goals did you work on?"
                    placeholder="Type your answer here"
                    content={networkFailGoals}
                    onContentChange={this.handleNetworkFailGoals}
                  />
                )}

              {(step == 3 || previewStep) &&
              goals.length > 0 &&
              selectedGoalsID.length > 0 && ( // Need to keep the title separate, because has many dropdownchip questions
                  <Grid item xs={12}>
                    <div className="body bodyBold paddingTop30px">
                      3. Did you work on any of these tasks?
                    </div>
                    <div className="helper paddingTop10px paddingBottom10px">
                      Choose as many as you like
                    </div>
                  </Grid>
                )}
              {(step == 3 || previewStep) &&
                goals.length > 0 &&
                selectedGoalsID.length > 0 &&
                selectedGoalsID.map(goalID => (
                  // console.log("TESTING Filtered goals" + goals.filter(goal => goal["goal"]["id"] == goalID)[0]["goal"]["goal"])
                  <DropDownChipQuestion
                    subheading={
                      goals.filter(goal => goal["goal"]["id"] == goalID)[0][
                        "goal"
                      ]["goal"]
                    } // Breaking hazard, hack
                    placeholder="Select tasks"
                    content={subgoals.filter(
                      subgoal => subgoal.goal_id == goalID
                    )}
                    key1="subgoal"
                    key2={null}
                    onSelectionChange={this.handleSubGoalSelection}
                    selected={selectedSubGoals}
                  />
                ))}
              {(step == 3 || previewStep) &&
              goals.length > 0 &&
              selectedGoalsID.length == 0 && ( // Case: No selected goals
                  <Grid item xs={12}>
                    <div className="body bodyBold paddingTop30px width900px">
                      3. Did you work on any of these tasks?
                    </div>
                    <div className="helper paddingTop10px paddingBottom10px">
                      No goals were chosen. To add goals, press Back. To skip,
                      press Next.
                    </div>
                  </Grid>
                )}
              {(step == 3 || previewStep) &&
              goals.length == 0 && ( // Case: Network Failture
                  <StandardQuestion
                    question="3. What tasks did you work on?"
                    placeholder="Type your answer here"
                    content={networkFailSubGoals}
                    onContentChange={this.handleNetworkFailSubGoals}
                  />
                )}

              {(step == 4 || previewStep) && (
                <ChipQuestion
                  question={
                    selectedSubGoals.length == 0
                      ? "4. What activities did you have with your child?"
                      : "4. While working on the tasks, what activities did you do with your child?"
                  }
                  helper="Choose as many as you like"
                  options={ACTIVITY_OPTIONS}
                  selectedOptions={selectedActivities}
                  onSelectionChange={this.handleActivitySelection}
                />
              )}
              {(step == 4 || previewStep) && (
                <StandardQuestion
                  placeholder="Additional Activities"
                  content={additionalActivities}
                  onContentChange={this.handleAdditionalActivities}
                />
              )}
              {(step == 4 || previewStep) && (
                <ScaleQuestion
                  question="5. How effectively did your child communicate?"
                  onEffectivenessChange={this.handleCommunicationSelection}
                  effectiveness={communication}
                />
              )}
              {(step == 4 || previewStep) && (
                <ScaleQuestion
                  question="6. How effectively did you support your child's communication?"
                  onEffectivenessChange={this.handleSupportSelection}
                  effectiveness={support}
                />
              )}
              {(step == 5 || previewStep) && (
                <StandardQuestion
                  question="7. What went well?"
                  helper={
                    selectedSubGoals.length == 0
                      ? "Take a moment to reflect on aspects that went well during the activities. How do you know they went well and what you should keep doing?"
                      : "Take a moment to reflect on aspects that went well when performing the tasks. How do you know they went well and what you should keep doing?"
                  }
                  placeholder={DEFAULT_TEXTBOX_PLACEHOLDER}
                  content={learningsGood}
                  onContentChange={this.handleGoodLearnings}
                />
              )}
              {(step == 5 || previewStep) && (
                <StandardQuestion
                  question="8. What didn't go well?"
                  helper={
                    selectedSubGoals.length == 0
                      ? "Take a moment to reflect on aspects that didn’t go well during the activities. Why did they not go well and what can you do next time to improve them?"
                      : "Take a moment to reflect on aspects that didn’t go well when performing the tasks. Why did they not go well and what can you do next time to improve them?"
                  }
                  placeholder={DEFAULT_TEXTBOX_PLACEHOLDER}
                  content={learningsBad}
                  onContentChange={this.handleBadLearnings}
                />
              )}
              {(step == 5 || previewStep) && (
                <StandardQuestion
                  question={
                    selectedSubGoals.length == 0
                      ? "9. Write down any additional notes regarding today's activities"
                      : "9. Write down any additional notes regarding today's tasks"
                  }
                  placeholder={DEFAULT_TEXTBOX_PLACEHOLDER}
                  content={additionalNotes}
                  onContentChange={this.handleAdditionalNotes}
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
                {step < numSteps - 1 && (
                  <Grid item>
                    <div
                      className="button buttonWidth100px borderRadius25px marginTop30px"
                      onClick={this.moveForward}
                    >
                      Next
                    </div>
                  </Grid>
                )}
                {step == numSteps - 1 && (
                  <Grid item>
                    <div
                      className="button buttonWidth100px borderRadius25px marginTop30px"
                      onClick={this.moveForward}
                    >
                      Review
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
