import React, { Component } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { DEFAULT_HEADERS, GOALS_PATH, SUCCESS } from "../constants";
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
import EditGoals from "./EditGoals";

const styles = theme => ({
  panel: {
    paddingTop: 15
  },
  text: {
    paddingLeft: 50
  },
  chip: {
    paddingLeft: 20
  }
});

const NewExpansionPanelSummary = withStyles({
  expandIcon: {
    order: -1
  }
})(ExpansionPanelSummary);

const options = { year: 'numeric', month: 'short', day: 'numeric' };

class ViewCompletedGoals extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      goals: {},
      tasks: [],
      checked: false,
      goalsExist: true,
      goalId: null,
      status: false
    };
  }

  componentDidMount() {
    const { userId } = this.context;
    axios.get(GOALS_PATH + "/" + parseInt(userId) + "/complete", {headers: DEFAULT_HEADERS}).then(
      response => {
        if (response.data.status == SUCCESS && response.data.data.length != 0) {
          var tempGoals = [];
          var tempTasks = [];
          for (const data of response.data.data) {
            tempGoals.push(data["goal"]);
            tempTasks.push(data["subgoals"]);
          }
          this.setState({
            goals: tempGoals,
            tasks: tempTasks
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

  createPanel() {
    const { classes } = this.props
    const { goals, tasks } = this.state;
    let panel =[]

    for (let i = 0; i < goals.length; i++){
      let summary = []
      let details = []
      let date, goal, goalId, goalType = ""
      Object.entries(goals[i]).map(() => {
        date = new Date(goals[i]["timestamp"])
        goal = goals[i]["goal"]
        goalId = goals[i]["id"]
        goalType = goals[i]["category"]
      })
      summary.push(
        <NewExpansionPanelSummary expandIcon={tasks[i].length ? <ExpandMoreIcon /> : null}>
          <Grid item xs={2}>
            <div className={ classes.chip }>
              { this.createChip(goalType) }
            </div>
          </Grid>
          <Grid item xs={6}>
            <Typography className={ classes.text } variant="h6">
              { goal }
            </Typography>
            <Typography className={ classes.text } variant="subtitle1">
              Created on { date.toLocaleString([], options) }
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div style={{float: "right"}}>
              <Button variant="text" onClick={this.handleIncomplete(goalId)}>Incomplete</Button>
              <Button variant="text" onClick={this.handleDelete(goalId)}>Delete</Button>
            </div>
          </Grid>
        </NewExpansionPanelSummary>
      )
      for (let j = 0; j < tasks[i].length; j++){
        // status = tasks[i][j]["status"] == "complete" ? true : false
        let task = ""
        Object.entries(tasks[i][j]).map(() => {
          task = tasks[i][j]["subgoal"]
        })
        details.push(
          <ExpansionPanelDetails>
            <FormControlLabel
              className={classes.text}
              onChange={this.handleStatusChange}
              control={<Checkbox color="primary" />}
              checked={this.state.status}
              label={task}
            />
          </ExpansionPanelDetails>
        )
      }
      panel.push(
        <ExpansionPanel className={ classes.panel }>
          { summary }{ details }
        </ExpansionPanel>
      )
    }
    return panel
  }

  createChip = type => {
    switch (type) {
      case 'linguistic':
        return <Chip style={{backgroundColor:"lightYellow", color: "darkYellow"}} label="Learning Language" />;
      case 'operational':
        return <Chip style={{backgroundColor:"lightOrange", color: "darkOrange"}} label="Managing AAC Device" />;
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

  viewForm() {
    return this.state.goalsExist ? this.createPanel() : this.default();
  }

  editForm(event) {
    return <EditGoals goalId={this.state.goalId} />
  }

  handleStatusChange = () => {
    this.setState({status: !this.state.status});
  }

  handleEdit = id => event => {
    event.stopPropagation()
    this.setState({isEdit: true})
    this.setState({goalId: id})
  }

  handleIncomplete = id => event => {
    const { userId } = this.context;
    event.stopPropagation();
    axios.put(GOALS_PATH + "/" + parseInt(userId) + "/incomplete", {goal_id: id}, {headers: DEFAULT_HEADERS})
    .then(res => {
      this.setState({ goals: this.state.goals.filter(goal => goal.id !== id) });
      if (this.state.goals.length == 0) 
        this.setState({ goalsExist: false });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleDelete = id => event => {
    event.stopPropagation();
    axios.delete(GOALS_PATH, {goal_id: id}, {headers: DEFAULT_HEADERS})
    .then(res => {
      this.setState({ goals: this.state.goals.filter(goal => goal.id !== id) });
      if (this.state.goals.length == 0) 
        this.setState({ goalsExist: false });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        {(!this.state.isEdit) ? this.viewForm() : this.editForm()}
      </div>
    );
  }
}

export default withStyles(styles)(ViewCompletedGoals);