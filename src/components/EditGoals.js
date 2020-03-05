import React, { Component } from "react";
import { Grid, Card, CardActions, CardContent, Button, TextField, InputLabel, Select, MenuItem, FormControl, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DEFAULT_HEADERS, GOALS_PATH, SUCCESS } from "../constants";

const styles = theme => ({
  textfield: {
    minWidth: 600
  },
  formControl: {
    minWidth: 300
  }
});

class EditGoals extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      goalType: "",
      tasks: [],
      isHidden: false
    };
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context;

    axios.get(GOALS_PATH + "/" + parseInt(userId), {headers: DEFAULT_HEADERS}).then(
      response => {
        if (response.data.status == SUCCESS && response.data.data.length != 0) {
          var tempGoal = "";
          var tempGoalType = "";
          var tempTasks = [];
          for (const data of response.data.data) {
            if (data["goal"]["id"] == this.props.goalId)
              tempGoal = data["goal"]["goal"];
              tempGoalType = data["goal"]["category"];
            if (data["subgoals"]["goal_id"] == this.props.goalId)
              tempTasks.push(data["subgoals"]["subgoal"]);
          }
          this.setState({
            goal: tempGoal,
            goalType: tempGoalType,
            tasks: tempTasks,
          });
        } else {
          this.setState({ goalsExist: false });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  dismiss() {
    this.props.dismiss();
  }

  handleTaskDesChange = idx => evt => {
    const newTasks = this.state.tasks.map((task, sidx) => {
      if (idx !== sidx) return task;
      return { ...task, des: evt.target.value };
    });
    this.setState({ tasks: newTasks });
  };

  handleAddTask = () => {
    this.setState({
      tasks: this.state.tasks.concat([{ des: "" }])
    });
  };

  handleRemoveTask = idx => () => {
    this.setState({
      tasks: this.state.tasks.filter((s, sidx) => idx !== sidx)
    });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    // axios.post(, this.state)
  }

  render() {
    const { classes } = this.props;
    const { goal, goalType, tasks, count } = this.state;
    return (
      <div className="addForm" style={{display: this.state.isHidden ? 'none' : '' }}>
        <form onSubmit={this.submitHandler}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={8}>
                  <TextField
                    className={ classes.textfield }
                    id="main-goal"
                    label="Enter your main goal"
                    variant="filled"
                    name="goal"
                    value={this.state.goal}
                    onChange={(value) => this.changeHandler(value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={ classes.formControl } variant="filled">
                    <InputLabel id="goal-type-label">Select goal type</InputLabel>
                    <Select id="goal-type-select" name="goalType" value={this.state.goalType} onChange={(value) => this.changeHandler(value)}>
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="linguistic">Learning Language</MenuItem>
                      <MenuItem value="operational">Managing AAC Device</MenuItem>
                      <MenuItem value="social">Practicing Conversation</MenuItem>
                      <MenuItem value="strategic">Enhancing Communication</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <div>
              {tasks.map((task, idx) => 
                <div>
                  <div style={{ display: 'inline-flex' }}>
                    <div> 
                      <IconButton onClick={this.handleRemoveTask(idx)}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <div>
                      <TextField className={ classes.textfield } id="task" label="Enter your task" name="task" value={task.des} onChange={this.handleTaskDesChange(idx)} />
                    </div>
                  </div>
                </div>
              )}
              <Button variant="text" onClick={this.handleAddTask}>+ Add Task</Button>
            </div>
            <CardActions>
              <Button variant="text" onClick={this.dismiss}>Cancel</Button>
              <Button variant="contained" type="submit">Save</Button>
            </CardActions>
          </Card>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(EditGoals);
