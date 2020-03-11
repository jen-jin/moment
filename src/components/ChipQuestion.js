import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

class ChipQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChips: this.props.selectedOptions
    };

    this.handleSelection = this.handleSelection.bind(this);
  }

  // Resource: https://www.robinwieruch.de/react-state-array-add-update-remove
  handleSelection(option) {
    if (!this.state.selectedChips.includes(option)) {
      // Adding Chip
      this.setState(
        {
          selectedChips: this.state.selectedChips.concat(option)
        },
        () => this.callBackSelectionChanged()
      );
    } else {
      // Removing Chip
      const newList = this.state.selectedChips.filter(i => i !== option);

      this.setState(
        {
          selectedChips: newList
        },
        () => this.callBackSelectionChanged()
      );
    }
  }

  async callBackSelectionChanged() {
    await this.props.onSelectionChange(this.state.selectedChips);
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
        <Grid item xs={12} style={{ maxWidth: 850 }}>
          {optionList.map((
            option // Note: Decreased width to stop resizing of grid with chip selection
          ) => (
            <Chip
              key={option}
              label={option}
              className={"chip-" + { option }}
              onClick={() => this.handleSelection(option)}
              variant={selectedChips.includes(option) ? "default" : "outlined"} // TODO: selectedChips.includes(option) is dumb
              color="primary"
              clickable
              style={{
                color: selectedChips.includes(option) ? "#FAFAFA" : "#1378C1",
                borderColor: "#1378C1",
                backgroundColor: selectedChips.includes(option)
                  ? "#1378C1"
                  : "#FAFAFA",
                marginBottom: 10,
                marginRight: 10
              }}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default ChipQuestion;
