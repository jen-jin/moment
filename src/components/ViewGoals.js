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
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  panel: {
    paddingTop: 15
  },
  text: {
    paddingLeft: 30
  }
});

const NewExpansionPanelSummary = withStyles({
  expandIcon: {
    order: -1
  }
})(ExpansionPanelSummary);

class ViewGoals extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      goals: {},
      tasks: [],
      goalsExist: false
    };
  }

  componentDidMount() {
    const { userId } = this.context;

    axios.get(GOALS_PATH + "/" + parseInt(userId), {headers: DEFAULT_HEADERS}).then(
        response => {
          if (response.data.status == SUCCESS && response.data.data.length != 0) {
            this.setState({ goalsExist: true });
            var tempGoals = [];
            var tempTasks = [];
            for (const data of response.data.data) {
              tempGoals.push(data["goal"]);
              tempTasks.push(data["subgoals"]);
            }
            this.setState({
              goals: tempGoals,
              tasks: tempTasks,
            });
            console.log(this.state.goals, this.state.tasks);
            console.log(this.state.tasks[0][0]["subgoal"]);
            console.log(this.state.tasks.length);
          } else {
            console.log('empty');
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  createPanel() {
    const { classes } = this.props;
    let panel =[]
    let summary = []

    for (let i = 0; i < this.state.goals.length; i++){
      let details = []
      summary.push(
        <NewExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={ classes.text }>{ this.state.goals[i]["goal"] }</Typography>
        </NewExpansionPanelSummary>
      )
      for (let j = 0; j < this.state.tasks.length; j++){
        details.push(
          <ExpansionPanelDetails>
            <FormControlLabel
              className={classes.text}
              onClick={event => event.stopPropagation()}
              onFocus={event => event.stopPropagation()}
              control={<Checkbox color="primary" />}
              label={this.state.tasks[i][j]["subgoal"]}
            />
          </ExpansionPanelDetails>
        )
      }
      panel.push(<ExpansionPanel className={ classes.panel }>{ summary }{ details }</ExpansionPanel>)
    }
    return panel
  }

  default() {
    return <div class="paragraph"><p><small>You haven't created any goal yet. Click + Add Goal button to create a new goal.</small></p></div>
  }

  render() {
    return (
      <div>
        { this.state.goalsExist ? this.createPanel() : this.default() }
      </div>
    );
  }
}

export default withStyles(styles)(ViewGoals);