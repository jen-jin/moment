import React, { Component } from "react";
import { Grid, Card, CardActions, CardContent, Button, TextField, InputLabel, Select, MenuItem, FormControl, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";

const styles = theme => ({
  textfield: {
    minWidth: 600
  },
  formControl: {
    minWidth: 300
  }
});

class AddGoals extends Component {
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
                  <TextField className={ classes.textfield } id="main-goal" label="Enter your main goal" variant="filled" name="goal" value={goal} onChange={this.changeHandler} />
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={ classes.formControl } variant="filled">
                    <InputLabel id="goal-type-label">Select goal type</InputLabel>
                    <Select id="goal-type-select" name="goalType" value={goalType} onChange={this.changeHandler}>
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value={1}>Learning Language</MenuItem>
                      <MenuItem value={2}>Managing AAC Device</MenuItem>
                      <MenuItem value={3}>Practicing Conversation</MenuItem>
                      <MenuItem value={4}>Enhancing Communication</MenuItem>
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
                      <TextField id="task" label="Enter your task" name="task" value={task.des} onChange={this.handleTaskDesChange(idx)} />
                    </div>
                  </div>
                </div>
              )}
              <Button color="primary" onClick={this.handleAddTask}>+ Add Task</Button>
            </div>
            <CardActions>
              <Button color="primary" onClick={this.dismiss}>Cancel</Button>
              <Button color="primary" variant="contained" type="submit">Save</Button>
            </CardActions>
          </Card>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(AddGoals);
