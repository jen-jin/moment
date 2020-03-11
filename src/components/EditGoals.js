import React, { Component } from "react";
import { Grid, Card, CardActions, CardContent, Button, TextField, InputLabel, Select, MenuItem, FormControl, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import HelpIcon from '@material-ui/icons/Help';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DEFAULT_HEADERS, GOALS_PATH, SUCCESS } from "../constants";
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
  },
});

class EditGoals extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isHidden: false,
      disabled: false,
      anchor: null
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

  handleAddTask = e => {
    var subgoals = this.state.data.subgoals.concat([{ subgoal: "" }]);
    var data = Object.assign(this.state.data, {subgoals: subgoals});
    this.setState({data: data});
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

  changeTask = idx => e => {
    var data = {};
    var subgoal = [];
    this.state.data.subgoals.map((task, index) => {
      if (index === idx)
        subgoal.push({...task, subgoal: e.target.value})
      else
        subgoal.push({...task})
    })
    data = Object.assign(this.state.data, {subgoals: subgoal})
    this.setState({data: data})
  }

  save = e => {
    this.setState({disabled: true});
    e.preventDefault()
    var goalName, goalType, goalId = ""
    var subgoal = []
    {Object.keys(this.state.data.goal).map(() => {
      goalName = this.state.data.goal.goal
      goalType = this.state.data.goal.category
      goalId = this.state.data.goal.id
    })}
    this.state.data.subgoals.map((task) => {
      if (task.subgoal.length > 0)
        subgoal.push({...task})
    })
    const data = {
      user_id: parseInt(this.context.userId),
      main_goal: {
        goal_id: goalId,
        goal: goalName,
        category: goalType
      },
      subgoals: subgoal
    }
    var newData = Object.assign(this.state.data, {subgoals: subgoal});
    axios({
      method: 'put',
      url: GOALS_PATH,
      data: data,
      headers: { DEFAULT_HEADERS, 'Content-Type': 'application/json' }
    })
    .then(() => {
      this.setState({data: newData});
      this.props.onEditEnd(goalId, this.state.data);
      this.props.enqueueSnackbar('Successfully saved the goal', {variant: 'success'});
    })
    .catch(error => {
      console.log(error);
    });
  }

  createForm() {
    const { classes } = this.props;
    const { data, anchor } = this.state;
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;
    let goal, goalType = "";
    return(
      <div className={ classes.container }>
        <Card>
          {Object.keys(data.goal).map(() => {
            goal = data.goal.goal
            goalType = data.goal.category
          })}
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <TextField required autoFocus
                  className={ classes.textfield }
                  id="main-goal"
                  label="Enter your main goal"
                  variant="filled"
                  name="goal"
                  value={goal}
                  onChange={this.changeGoal}
                />
              </Grid>
              <Grid item xs={12} sm container spacing={1}>
                <Grid item xs>
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
            {data.subgoals.map((task, idx) => 
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Grid container>
                    <Grid item xs>
                      <IconButton style={{float: "right"}} onClick={this.handleRemoveTask(idx)}>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={11}>
                      <TextField autoFocus
                        className={ classes.textfield } 
                        id="task" 
                        label="Enter your task" 
                        name="task" 
                        value={task.subgoal}
                        onChange={this.changeTask(idx)} 
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Button style={{marginTop: 15, marginLeft: 30}} variant="outlined" onClick={this.handleAddTask}>+ Add Task</Button>
          </div>
          <CardActions>
            <Button variant="text" onClick={this.dismiss}>Cancel</Button>
            <Button variant="contained" onClick={this.save} disabled={this.state.disabled}>
              {this.state.disabled ? 'Saving...' : 'Save'}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  handleClick = event => {
    this.setState({anchor: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchor: null});
  };

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

export default withStyles(styles)(withSnackbar(EditGoals));
