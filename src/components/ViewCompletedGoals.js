import React, { Component } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DEFAULT_HEADERS, GOALS_PATH, SUCCESS, SUBGOALS_PATH } from "../constants";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

const styles = theme => ({
  panel: {
    paddingTop: 30
  }
});

const StyledCheckbox = withStyles(theme => ({
  root: { 
    '&$checked': {
      color: '#1378C1',
    },
  },
  checked: {},
}))(Checkbox);

const NewExpansionPanelSummary = withStyles({
  expandIcon: {
    order: -1,
    margin: 0
  }
})(ExpansionPanelSummary);

const options = { year: 'numeric', month: 'short', day: 'numeric' };

class ViewCompletedGoals extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      goalsExist: true
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context;
    axios.get(GOALS_PATH + "/" + parseInt(userId) + "/complete", {headers: DEFAULT_HEADERS}).then(
      response => {
        if (response.data.status == SUCCESS && response.data.data.length != 0) {
          this.setState({data: response.data.data});
        } else {
          this.setState({ goalsExist: false });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  createChip = type => {
    switch (type) {
      case 'linguistic':
        return <Chip style={{backgroundColor: "lightYellow", color: "darkYellow"}} label="Learning Language" />;
      case 'operational':
        return <Chip style={{backgroundColor: "lightOrange", color: "darkOrange"}} label="Managing AAC Device" />;
      case 'social':
        return <Chip style={{backgroundColor: "lightGreen", color: "darkGreen"}} label="Practicing Conversation" />;
      case 'strategic':
        return <Chip style={{backgroundColor: "lightBlue", color: "darkBlue"}} label="Enhancing Communication" />;
      default:
        return null;
    }
  }

  default() {
    return <div class="paragraph"><p><small>You have no completed goals.</small></p></div>
  }

  handleStatusChange = (i, index) => event => {
    var data = [];
    this.state.data.map((item, indexx) => {
      var subgoal = [];
      item.subgoals.map((s, ii) => {
        if (i === ii)
          subgoal.push({...s, status: event.target.checked ? "complete" : "incomplete"})
        else
          subgoal.push({...s})
      });
      if (index === indexx)
        data.push({...item, subgoals: subgoal})
      else
        data.push({...item})
    });
    this.setState({ data: data });
    this.sendStatus(data);
    { event.target.checked ? this.props.enqueueSnackbar('Successfully marked the task as complete', {variant: 'success'}) : this.props.enqueueSnackbar('Successfully marked the task as incomplete', {variant: 'success'}) }
  }

  sendStatus = data => {
    var subgoals = [];
    data.map((item) => {
      item.subgoals.map((s) => {
        subgoals.push({subgoal_id: s.id, status: s.status})
      })
    })
    axios({
      method: 'put',
      url: SUBGOALS_PATH,
      data: {subgoals: subgoals},
      headers: { DEFAULT_HEADERS, 'Content-Type': 'application/json' }
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleIncomplete = id => event => {
    const { userId } = this.context;
    var goalId = "";
    var data = [];
    event.stopPropagation();
    axios.put(GOALS_PATH + "/" + parseInt(userId) + "/incomplete", {goal_id: id}, {headers: DEFAULT_HEADERS})
    .then(() => {
      this.state.data.map((item) => {
        {Object.keys(item.goal).map(() => {
          goalId = item.goal.id
        })}
        if (goalId !== id)
          data.push({...item})
      })
      this.setState({ data: data })
      if (this.state.data.length === 0) this.setState({ goalsExist: false})
      this.props.enqueueSnackbar('Successfully marked the goal as incomplete', {variant: 'success'});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleDelete(id, e) {
    e.stopPropagation();
    var goalId = "";
    var data = [];
    axios({
      method: 'delete',
      url: GOALS_PATH,
      data: {goal_id: id},
      headers: {DEFAULT_HEADERS, 'Content-Type': 'application/json'}
    })
    .then(() => {
      this.state.data.map((item) => {
        {Object.keys(item.goal).map(() => {
          goalId = item.goal.id
        })}
        if (goalId !== id)
          data.push({...item})
      })
      this.setState({ data: data })
      if (this.state.data.length === 0) this.setState({ goalsExist: false})
      this.props.enqueueSnackbar('Successfully deleted the goal', {variant: 'success'});
    })
    .catch(error => {
      console.log(error);
    });
  }

  taskExist = id => {
    let taskExist = false;
    this.state.data.map((item) => {
      item.subgoals.map((task) => {
        if (task.goal_id === id)
          taskExist = true;
      })
    })
    return taskExist;
  }

  sortData = data => {
    data.sort((a, b) => b.goal.timestamp.localeCompare(a.goal.timestamp));
  }

  createPanel() {
    const { classes } = this.props;
    const { data } = this.state;
    let date, goal, goalId, goalType = "";
    this.sortData(data);
    return (
      <div className={classes.panel}>
      { 
          data.map((item, index) => {
            return (
              <ExpansionPanel>
                {Object.keys(item.goal).map(() => {
                  date = new Date(item.goal.timestamp)
                  goal = item.goal.goal
                  goalId = item.goal.id
                  goalType = item.goal.category
                })}
                <NewExpansionPanelSummary expandIcon={this.taskExist(goalId) ? <ExpandMoreIcon /> : <div className="emptyGoalSpacing" />}>
                  <Grid container spacing={2}>
                    <Grid item>
                      { this.createChip(goalType) }
                    </Grid>
                    <Grid item xs={12} sm container spacing={2}>
                      <Grid item xs>
                        <Typography variant="h6">
                          { goal }
                        </Typography>
                        <Typography variant="subtitle1">
                          Created on { date.toLocaleString([], options) }
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="text" onClick={this.handleIncomplete(goalId)}>Incomplete</Button>
                        <Button variant="text" onClick={(e) => {(window.confirm('Are you sure you want to delete this goal?')) ? this.handleDelete(item.goal.id, e) : e.stopPropagation()}}>Delete</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </NewExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    {item.subgoals.map((s, i) => 
                      <div key={i} style={{paddingLeft: 50}}>
                        <FormControlLabel
                          onChange={this.handleStatusChange(i, index)}
                          control={<StyledCheckbox />}
                          checked={s.status == "complete" ? true : false}
                          label={s.subgoal}
                        />
                      </div>
                    )}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </div>
    );
  }

  render() {
    const goalsExist = this.state.goalsExist;
    return (
      <div style={{flexGrow: 1}}>
        {goalsExist ? this.createPanel() : this.default()}
      </div>
    );
  }
}

export default withStyles(styles)(withSnackbar(ViewCompletedGoals));