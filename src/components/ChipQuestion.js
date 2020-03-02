import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

class ChipQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChips: []
    };

    this.handleSelection = this.handleSelection.bind(this);
  }

  // Resource: https://www.robinwieruch.de/react-state-array-add-update-remove
  handleSelection(event) {
    const value = event.target.value;
    if (!this.state.selectedChips.includes(value)) {
      // Adding Chip
      this.setState({
        selectedChips: [...this.state.selectedChip, event.target.value]
      });
    } else {
      // Removing Chip
      const newList = this.state.selectedChips.filter(i => i !== value);
      console.log("Filtered List: " + newList);
      this.setState({
        selectedChips: newList
      });
    }
  }

  render() {
    const optionList = this.props.options;
    const selectedChips = this.state.selectedChips;

    return (
      <div className="paddingTop30px">
        <Grid item xs={12}>
          <div className="body bodyBold">{this.props.question}</div>
          <div className="helper paddingTop10px paddingBottom10px">
            {this.props.helper}
          </div>
        </Grid>
        <Grid item xs={12} style={{ maxWidth: 900}}>
          {optionList.map(option => (
            <Chip
              key={option}
              label={option}
              className={"chip-" + { option }}
            //   onClick={this.handleSelection}
              variant={selectedChips.includes(option) ? "default" : "outlined"}
              color="primary"
              clickable              
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default ChipQuestion;
