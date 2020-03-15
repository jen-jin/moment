import React, { Component } from "react";
import { Prompt } from "react-router";
import StandardQuestion from "./StandardQuestion";
import PictureQuestion from "./PictureQuestion";
import ScaleQuestion from "./ScaleQuestion";
import DropDownChipQuestion from "./DropDownChipQuestion";
import ChipQuestion from "./ChipQuestion";
import ProgressBar from "./ProgressBar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {
  DEFAULT_HEADERS,
  GOALS_PATH,
  SUBGOALS_PATH,
  REFLECTION_PATH,
  SUCCESS,
  DATE_OPTIONS,
  ACTIVITY_OPTIONS,
  DEFAULT_REFLECTION_TITLE,
  DEFAULT_TEXTBOX_PLACEHOLDER
} from "../../constants";

class CreateReflection extends Component {
  static contextType = AuthContext;

  // MARK: - Constructor
  constructor(props) {
    super(props);

    this.myRef = React.createRef(); // Scrolling to top

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
      networkFailGoals: "",
      networkFailSubGoals: "",
      selectedSubGoals: [],
      selectedActivities: [],
      additionalActivities: "",
      learningsGood: "",
      learningsBad: "",
      additionalNotes: "",
      communicationNotes: "",
      supportNotes: "",
      title: DEFAULT_REFLECTION_TITLE,
      date: new Date().toLocaleTimeString("en-US", DATE_OPTIONS),
      previewStep: false,
      completedReflection: false,
      errorFetchingGoals: null,
      errorFetchingSubGoals: null
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
    this.handleCommunicationNotes = this.handleCommunicationNotes.bind(this);
    this.handleSupportNotes = this.handleSupportNotes.bind(this);
    this.handleGoodLearnings = this.handleGoodLearnings.bind(this);
    this.handleBadLearnings = this.handleBadLearnings.bind(this);
    this.handleNetworkFailGoals = this.handleNetworkFailGoals.bind(this);
    this.handleNetworkFailSubGoals = this.handleNetworkFailSubGoals.bind(this);
    this.goalsToSubgoals = this.goalsToSubgoals.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  // MARK: - Lifecycle
  componentDidMount() {
    const { userId } = this.context;

    console.log("User ID: " + userId);

    axios
      .get(GOALS_PATH + "/" + parseInt(userId) + "/incomplete", {
        headers: DEFAULT_HEADERS
      })
      .then(
        response => {
          if (response.data.status == SUCCESS) {
            this.setState({
              goals: response.data.data,
              errorFetchingGoals: null
            });
          }
        },
        error => {
          console.log(error);

          this.setState({
            errorFetchingGoals: error
          });
        }
      );
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  // MARK: - Fetching subgoals

  async fetchSubGoalsHelper() {
    await this.state.selectedGoals.map(goal => {
      this.fetchSubGoals(goal);
    });
  }

  async fetchSubGoals(goal) {
    await axios
      .get(SUBGOALS_PATH + "/" + goal.id, {
        headers: DEFAULT_HEADERS
      })
      .then(
        response => {
          if (response.data.status == SUCCESS) {
            // Checking if subgoals already exist before adding (same goalID)
            if (
              this.state.subgoals.filter(subgoal => subgoal.goal_id == goal.id)
                .length == 0
            ) {
              this.setState({
                subgoals: this.state.subgoals.concat(response.data.data),
                errorFetchingSubGoals: null
              });
            }
          }
        },
        error => {
          console.log(error);

          this.setState({
            errorFetchingSubGoals: error
          });
        }
      );
  }

  // MARK: - Submitting Reflection
  async postReflection() {
    await axios({
      method: "post",
      url: REFLECTION_PATH,
      data: {
        user_id: this.context.userId,
        title: this.state.title,
        reflection: JSON.stringify(this.state)
      },
      headers: { DEFAULT_HEADERS }
    })
      .then(() => this.navigateToReflection())
      .catch(error => {
        // TODO: Better error handling, such as when they try and submit without internet
        console.log(error);
      });
  }

  // MARK: - Reflection Changes
  changedTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleSubmit() {
    this.setState(
      {
        completedReflection: true,
        displayPrompt: true
      },
      () => this.postReflection()
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

  async handleCommunicationNotes(notes) {
    await this.setState({
      // NOTE: Await is necessary here
      communicationNotes: notes
    });
  }

  // MARK: - Handling Support Scale Question
  async handleSupportSelection(responses) {
    await this.setState({
      // NOTE: Await is necessary here
      support: responses
    });
  }

  async handleSupportNotes(notes) {
    await this.setState({
      // NOTE: Await is necessary here
      supportNotes: notes
    });
  }

  // MARK: - Handling Goal Question
  async handleGoalSelection(newGoals) {
    // Clear current goals
    await this.setState({
      // Await is necessary
      selectedGoals: []
    });

    await newGoals.map(title => {
      const matchingGoal = this.state.goals.find(
        goal => goal["goal"]["goal"] == title
      );

      if (matchingGoal !== undefined) {
        const selectedGoal = {
          id: matchingGoal["goal"]["id"],
          value: matchingGoal["goal"]["goal"]
        };
        const alreadyExists = this.state.selectedGoals.find(
          existingGoal => existingGoal.id == selectedGoal.id
        );

        if (alreadyExists === undefined) {
          this.setState({
            selectedGoals: [...this.state.selectedGoals].concat(selectedGoal)
          });

          // If it is the preview step, subgoals question should change with goals
          if (this.state.previewStep) {
            this.fetchSubGoalsHelper();
          }
        }
      }
    });
  }

  // MARK: - Handling Goal Question
  async handleSubGoalSelection(newSubGoals) {
    // Clearing subgoals first, if only one select
    // Known bug, removal of subgoals if there exists multiple goals will not work
    if (newSubGoals.length === 0 || this.state.selectedGoals.length === 1) {
      await this.setState({
        // Await is necessary
        selectedSubGoals: []
      });
    }

    await newSubGoals.map(title => {
      const selectedSubGoal = this.state.subgoals.find(
        subgoal => subgoal.subgoal == title
      );

      if (selectedSubGoal !== undefined) {
        const alreadyExists = this.state.selectedSubGoals.find(
          existingSubGoal => existingSubGoal.id == selectedSubGoal.id
        );

        if (alreadyExists === undefined) {
          this.setState({
            selectedSubGoals: [...this.state.selectedSubGoals].concat(
              selectedSubGoal
            )
          });
        }
      }
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
  async goalsToSubgoals() {
    await this.fetchSubGoalsHelper();
    this.setState({ step: this.state.step + 1 });
  }

  // MARK: - Navigating Sections
  moveForward() {
    this.scrollToTop();
    // If step == 2, goals question, fetch subgoals
    if (this.state.step == 2) {
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
    this.scrollToTop();
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
      networkFailGoals,
      networkFailSubGoals,
      selectedSubGoals,
      selectedActivities,
      additionalActivities,
      learningsGood,
      learningsBad,
      additionalNotes,
      communicationNotes,
      supportNotes,
      previewStep,
      errorFetchingGoals,
      errorFetchingSubGoals
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
              <div className="paddingTop60px" />
              <TextField
                id="standard-basic"
                placeholder={DEFAULT_REFLECTION_TITLE}
                inputProps={{
                  style: { fontFamily: "Open Sans", fontSize: 24, width: 500 }
                }}
                onChange={this.changedTitle}
                autoFocus={true}
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
                {step === 1 && "Let's get started! "}
                {step < numSteps && step > 1 && "Keep going! "}
                {step == numSteps && "You're almost there! "}
                You're on section {step} of {numSteps}.
              </div>
              <ProgressBar percentage={parseInt((step / numSteps) * 100, 10)} />
            </Grid>
            <Grid item>
              {(step === 1 || previewStep) && (
                <PictureQuestion
                  onMoodChange={this.handleMoodSelection}
                  moods={moods}
                />
              )}

              {(step === 2 || previewStep) && errorFetchingGoals === null && (
                <DropDownChipQuestion
                  question="2. Did you work on any of these goals?"
                  helper="Choose as many as you like"
                  placeholder="Select goals"
                  subheading={null}
                  content={goals}
                  key1="goal"
                  key2="goal"
                  onSelectionChange={this.handleGoalSelection}
                  selected={
                    selectedGoals.length == 0
                      ? selectedGoals
                      : selectedGoals.map(goal => goal.value)
                  }
                />
              )}
              {(step === 2 || previewStep) &&
              errorFetchingGoals !== null && ( // In the case of network failure or no goals available
                  <StandardQuestion
                    question="2. What goals did you work on?"
                    placeholder="Type your answer here"
                    content={networkFailGoals}
                    onContentChange={this.handleNetworkFailGoals}
                  />
                )}
              {(step === 3 || previewStep) &&
              errorFetchingGoals === null &&
              selectedGoals.length > 0 && ( // Need to keep the title separate, because has many dropdownchip questions
                  <Grid item xs={12}>
                    <div className="body bodyBold paddingTop30px">
                      3. Did you work on any of these tasks?
                    </div>
                    <div className="helper paddingTop10px paddingBottom10px">
                      Choose as many as you like
                    </div>
                  </Grid>
                )}
              {(step === 3 || previewStep) &&
                errorFetchingGoals === null &&
                selectedGoals.length > 0 &&
                selectedGoals.map(goal => (
                  <DropDownChipQuestion
                    subheading={goal.value}
                    placeholder="Select tasks"
                    content={subgoals.filter(
                      subgoal => subgoal.goal_id == goal.id
                    )}
                    key1="subgoal"
                    key2={null}
                    onSelectionChange={this.handleSubGoalSelection}
                    selected={
                      selectedSubGoals.length == 0
                        ? selectedSubGoals
                        : selectedSubGoals
                            .filter(subGoal => subGoal.goal_id == goal.id)
                            .map(subGoalInfo => subGoalInfo.subgoal)
                    }
                  />
                ))}
              {(step == 3 || previewStep) &&
              errorFetchingGoals === null &&
              selectedGoals.length == 0 && ( // Case: No selected goals
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
              (errorFetchingGoals || errorFetchingSubGoals) && ( // Case: Network Failture
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
                  question="5. Overall, how effectively did your child communicate?"
                  onEffectivenessChange={this.handleCommunicationSelection}
                  effectiveness={communication}
                />
              )}
              {(step == 4 || previewStep) && (
                <StandardQuestion
                  placeholder="Additional Comments"
                  content={communicationNotes}
                  onContentChange={this.handleCommunicationNotes}
                />
              )}
              {(step == 4 || previewStep) && (
                <ScaleQuestion
                  question="6. Overall, how effectively did you support your child's communication?"
                  onEffectivenessChange={this.handleSupportSelection}
                  effectiveness={support}
                />
              )}
              {(step == 4 || previewStep) && (
                <StandardQuestion
                  placeholder="Additional Comments"
                  content={supportNotes}
                  onContentChange={this.handleSupportNotes}
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
