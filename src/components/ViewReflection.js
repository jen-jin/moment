import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import ReviewSelectQuestion from "./ReviewSelectQuestion";
import ReviewTypedQuestion from "./ReviewTypedQuestion";
import { AuthContext } from "../context/AuthContext";

class ViewReflection extends Component {
  static contextType = AuthContext;

  // MARK: - Constructor
  constructor(props) {
    super(props);
    const info = this.props.location.state;

    this.state = {
      title: info[0],
      dateCreated: info[1],
      reflectionID: info[2],
      reflection: info[3]
    };

    this.createCards = this.createCards.bind(this);
    this.createGoals = this.createGoals.bind(this);
    this.createTasks = this.createTasks.bind(this);
    this.createChips = this.createChips.bind(this);
    this.closeReflection = this.closeReflection.bind(this);
  }

  // MARK: - Creating Questions
  createCards(cards) {
    const chosenCards = [];
    Object.entries(cards).map(([key, value]) => {
      if (value) {
        chosenCards.push(key);
      }
    });
    return chosenCards;
  }

  createGoals(goals) {
    const chosenGoals = [];

    goals.map(goal => {
      chosenGoals.push(goal.value);
    });

    return chosenGoals;
  }

  createTasks(tasks) {
    const chosenTasks = [];

    tasks.map(task => {
      chosenTasks.push(task.subgoal);
    });

    return chosenTasks;
  }

  createChips(chips) {
    const chosenChips = [];

    chips.map(chip => {
      chosenChips.push(chip);
    });

    return chosenChips;
  }

  // MARK: - Close
  closeReflection() {
    this.props.history.replace("/reflection");
  }

  // MARK: - Render
  render() {
    const { title, dateCreated, reflectionID, reflection } = this.state;
    // console.log("Reflection Data", reflection)
    const parsedReflection = JSON.parse(reflection);
    const moods = this.createCards(parsedReflection.moods);
    const goals = this.createGoals(parsedReflection.selectedGoals);
    const tasks = this.createTasks(parsedReflection.selectedSubGoals);
    const activities = this.createChips(parsedReflection.selectedActivities);
    const additionalActivities = parsedReflection.additionalActivities;
    const communication = this.createCards(parsedReflection.communication);
    const communicationNotes = parsedReflection.communicationNotes;
    const support = this.createCards(parsedReflection.support);
    const supportNotes = parsedReflection.supportNotes;
    const learningsGood = parsedReflection.learningsGood;
    const learningsBad = parsedReflection.learningsBad;
    const additionalNotes = parsedReflection.additionalNotes;

    return (
      <div className="viewReflection">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="flex-start"
          justify="center"
        >
          <Grid item>
            <div className="paddingTop60px" />
            <Button
              className="button"
              variant="contained"
              onClick={this.closeReflection}
              style={{ marginLeft: 700 }}
            >
              <CloseIcon />
            </Button>
            <div className="header paddingTop10px blue">{title}</div>
            <div className="helper paddingTop10px">
              Date Created: <span className="blue">{dateCreated}</span>
            </div>
          </Grid>
          <Grid item>
            <ReviewSelectQuestion
              question="1. How are you feeling today?"
              content={moods}
            />
          </Grid>
          <Grid item>
            <ReviewSelectQuestion
              question="2. Did you work on any of these goals?"
              content={goals}
            />
          </Grid>
          <Grid item>
            <ReviewSelectQuestion
              question="3. Did you work on any of these tasks?"
              content={tasks}
            />
          </Grid>
          <Grid item>
            <ReviewSelectQuestion
              question={
                tasks.length === 0
                  ? "4. What activities did you have with your child?"
                  : "4. While working on the tasks, what activities did you do with your child?"
              }
              content={activities}
              additional={additionalActivities}
            />
          </Grid>
          <Grid item>
            <ReviewSelectQuestion
              question="5. Overall, how effectively did your child communicate?"
              content={communication}
              additional={communicationNotes}
            />
          </Grid>
          <Grid item>
            <ReviewSelectQuestion
              question="6. Overall, how effectively did you support your child's communication?"
              content={support}
              additional={supportNotes}
            />
          </Grid>
          <Grid item>
            <ReviewTypedQuestion
              question="7. What went well?"
              content={learningsGood}
            />
          </Grid>
          <Grid item>
            <ReviewTypedQuestion
              question="8. What didn't go well?"
              content={learningsBad}
            />
          </Grid>
          <Grid item>
            <ReviewTypedQuestion
              question={
                tasks.length === 0
                  ? "9. Write down any additional notes regarding today's activities"
                  : "9. Write down any additional notes regarding today's tasks"
              }
              content={additionalNotes}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewReflection;
