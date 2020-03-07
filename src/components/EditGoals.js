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
      data: {},
      isHidden: false
    };
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context;
    var goalId = "";
    let data = {};
    axios.get(GOALS_PATH + "/" + parseInt(userId) + "/incomplete", {headers: DEFAULT_HEADERS}).then(
      response => {
        if (response.data.status == SUCCESS) {
          response.data.data.map((item) => {
            {Object.keys(item.goal).map(() => {
              goalId = item.goal.id
            })}
            if (goalId === this.props.goalId)
              data = Object.assign({}, item)
          })
          this.setState({data: data})
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

  handleAddTask = e => {
    this.state.data.subgoals.push({subgoal: e.target.value})
    var data = Object.assign({}, this.state.data)
    this.setState({data: data})
    console.log(this.state.data)
  };

  handleRemoveTask = idx => () => {
    var subgoals = this.state.data.subgoals.filter((s, sidx) => idx !== sidx);
    var data = Object.assign(this.state.data, {subgoals: subgoals});
    this.setState({data: data});
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  changeGoal = e => {
    var goal, data = {};
    {Object.keys(this.state.data.goal).map(() => {
      goal = Object.assign(this.state.data.goal, {goal: e.target.value})
    })}
    data = Object.assign(this.state.data, {goal: goal})
    this.setState({data: data})
  }

  changeGoalType = e => {
    var category, data = {};
    {Object.keys(this.state.data.goal).map(() => {
      category = Object.assign(this.state.data.goal, {category: e.target.value})
    })}
    data = Object.assign(this.state.data, {category: category})
    this.setState({data: data})
  }

  changeTask = des => e => {
    var data = {};
    var subgoal = [];
    this.state.data.subgoals.map((task) => {
      if (task.subgoal === des)
        subgoal.push({...task, subgoal: e.target.value})
      else
        subgoal.push({...task})
    })
    data = Object.assign(this.state.data, {subgoals: subgoal})
    this.setState({data: data})
  }

  save = e => {
    e.preventDefault()
    var goalName, goalType, goalId = ""
    var subgoal = []
    {Object.keys(this.state.data.goal).map(() => {
      goalName = this.state.data.goal.goal
      goalType = this.state.data.goal.category
      goalId = this.state.data.goal.id
    })}
    this.state.data.subgoals.map((task) => {
      subgoal.push({...task})
    })
    subgoal = JSON.parse(JSON.stringify(subgoal).split('"id":').join('"subgoal_id":'))
    const data = {
      user_id: parseInt(this.context.userId),
      main_goal: {
        goal_id: goalId,
        goal: goalName,
        category: goalType
      },
      subgoals: subgoal
    }
    
    console.log(this.state.data)
    axios({
      method: 'put',
      url: GOALS_PATH,
      data: data,
      headers: { DEFAULT_HEADERS, 'Content-Type': 'application/json' }
    })
    .then(() => 
      this.props.onEditEnd(goalId, this.state.data)
    )
    .catch(error => {
      console.log(error);
    });
  }

  createForm() {
    const { classes } = this.props;
    const { data } = this.state;
    let goal, goalType = "";
    return(
      <div className="editForm">
        <Card>
          {Object.keys(data.goal).map(() => {
            goal = data.goal.goal
            goalType = data.goal.category
          })}
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <TextField required
                  className={ classes.textfield }
                  id="main-goal"
                  label="Enter your main goal"
                  variant="filled"
                  name="goal"
                  value={goal}
                  onChange={this.changeGoal}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl className={ classes.formControl } variant="filled">
                  <InputLabel id="goal-type-label">Select goal type</InputLabel>
                  <Select id="goal-type-select" name="category" value={goalType} onChange={this.changeGoalType}>
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
            {data.subgoals.map((task, idx) => 
              <div>
                <div style={{ display: 'inline-flex' }}>
                  <div> 
                    <IconButton onClick={this.handleRemoveTask(idx)}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <div>
                    <TextField
                      className={ classes.textfield } 
                      id="task" 
                      label="Enter your task" 
                      name="task" 
                      value={task.subgoal}
                      onChange={this.changeTask(task.subgoal)} 
                    />
                  </div>
                </div>
              </div>
            )}
            <Button variant="text" onClick={this.handleAddTask}>+ Add Task</Button>
          </div>
          <CardActions>
            <Button variant="text" onClick={this.dismiss}>Cancel</Button>
            <Button variant="contained" onClick={this.save}>Save</Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  render() {
    const data = this.state.data;
    var form = null;
    if (Object.entries(data).length > 0)
      form = this.createForm();
    return (
      <div>
        {form}
      </div>
    );
  }
}

export default withStyles(styles)(EditGoals);
