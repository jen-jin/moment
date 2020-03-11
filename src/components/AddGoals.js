import React, { Component } from "react";
import { Grid, Card, CardActions, CardContent, Button, TextField, InputLabel, Select, MenuItem, FormControl, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import HelpIcon from '@material-ui/icons/Help';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DEFAULT_HEADERS, GOALS_PATH } from "../constants";
import { withSnackbar } from 'notistack';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
  textfield: {
    width: "100%"
  },
  formControl: {
    width: "100%"
  },
  container: {
    flexGrow: 1,
    paddingTop: 30
  },
  helpText: {
    margin: 10
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
      disabled: false,
      anchor: null
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
    this.setState({disabled: true});
    e.preventDefault();
    var count = 0;
    var goalFormData = new FormData();
    goalFormData.append('user_id', parseInt(this.context.userId));
    goalFormData.append('goal', this.state.goal);
    goalFormData.append('category', this.state.category);
    this.state.tasks.forEach(function(subgoal) {
      if (subgoal.des.length > 0) {
        count++
        goalFormData.append('subgoal'.concat(count), subgoal.des)
      }
    });
    goalFormData.append('number_of_subgoals', count);
    
    axios({
      method: 'post',
      url: GOALS_PATH,
      data: goalFormData,
      headers: { DEFAULT_HEADERS, 'Content-Type': 'multipart/form-data' }
    })
    .then(() => {
      this.props.onAddEnd();
      this.props.enqueueSnackbar('Successfully saved the goal', {variant: 'success'});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleClick = event => {
    this.setState({anchor: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchor: null});
  };

  render() {
    const { classes } = this.props;
    const { goal, category, tasks, anchor } = this.state;
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;
    return (
      <div className={ classes.container }>
        <form onSubmit={this.submitHandler}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <TextField autoFocus required
                      className={ classes.textfield }
                      id="main-goal"
                      label="Enter your main goal"
                      variant="filled"
                      name="goal"
                      value={goal}
                      onChange={(value) => this.changeHandler(value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm container spacing={1}>
                    <Grid item xs>
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
                    <Grid item>
                      <IconButton onClick={this.handleClick}>
                        <HelpIcon />
                      </IconButton>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchor}
                        onClose={this.handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <div className={ classes.helpText }>
                          <div style={{fontSize: 15, fontWeight: 600}}>Learning Language</div>
                          <div style={{fontSize: 13, fontWeight: 100}}>Improving language use, Using appropriate grammar/syntax, Expanding vocabulary, etc.</div>
                        </div>
                        <div className={ classes.helpText }>
                          <div style={{fontSize: 15, fontWeight: 600}}>Managing AAC Device</div>
                          <div style={{fontSize: 13, fontWeight: 100}}>Turning AAC on/off, Navigating, Adding new words to AAC, Controlling volume, etc.</div>
                        </div>
                        <div className={ classes.helpText }>
                          <div style={{fontSize: 15, fontWeight: 600}}>Practicing Conversation</div>
                          <div style={{fontSize: 13, fontWeight: 100}}>Initiating/Maintaining/Terminating interactions, Expressing intent for communication, etc.</div>
                        </div>
                        <div className={ classes.helpText }>
                          <div style={{fontSize: 15, fontWeight: 600}}>Enhancing Communication</div>
                          <div style={{fontSize: 13, fontWeight: 100}}>Identifying communication breakdowns, Checking for partner reactions, etc.</div>
                        </div>
                      </Popover>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <div>
                {tasks.map((task, idx) => 
                  <Grid container spacing={3}>
                    <Grid item xs={8}>
                      <Grid container>
                        <Grid item xs>
                          <IconButton style={{float: "right"}} onClick={this.handleRemoveTask(idx)}>
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <TextField autoFocus className={ classes.textfield } id="task" label="Enter your task" name="task" value={task.des} onChange={this.handleTaskDesChange(idx)} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Button style={{marginTop: 15}} variant="outlined" onClick={this.handleAddTask}>+ Add Task</Button>
              </div>
              <CardActions>
                <Button variant="text" onClick={this.dismiss}>Cancel</Button>
                <Button variant="contained" type="submit" disabled={this.state.disabled}>
                  {this.state.disabled ? 'Saving...' : 'Save'}
                </Button>
              </CardActions>
            </Card>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(withSnackbar(AddGoals));
