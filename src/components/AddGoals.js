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

class AddGoals extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      category: "",
      tasks: [],
      isHidden: false
    };
    this.dismiss = this.dismiss.bind(this);
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
    e.preventDefault();

    var goalFormData = new FormData();
    goalFormData.append('user_id', parseInt(this.context.userId));
    goalFormData.append('goal', this.state.goal);
    goalFormData.append('category', this.state.category);
    goalFormData.append('number_of_subgoals', this.state.tasks.length);
    this.state.tasks.forEach(function(subgoal, index) {
      goalFormData.append('subgoal'.concat(index+1), subgoal.des)
    });
    
    axios({
      method: 'post',
      url: GOALS_PATH,
      data: goalFormData,
      headers: { DEFAULT_HEADERS, 'Content-Type': 'multipart/form-data' }
    })
    .then(() => 
      this.props.onAddEnd()
    )
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { classes } = this.props;
    const { goal, category, tasks } = this.state;
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
                    value={goal}
                    onChange={(value) => this.changeHandler(value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={ classes.formControl } variant="filled">
                    <InputLabel id="goal-type-label">Select goal type</InputLabel>
                    <Select id="goal-type-select" name="category" value={category} onChange={this.changeHandler}>
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

export default withStyles(styles)(AddGoals);
