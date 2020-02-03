import React, { Component } from "react";
import StandardQuestion from "./StandardQuestion";
import MCQuestion from "./MCQuestion";
import Grid from "@material-ui/core/Grid";

class Reflection extends Component {
  constructor(props) {
    super(props);

    this.state = { step: 1 };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackwards = this.moveBackwards.bind(this);
  }

  handleSubmit() {
    // Submit
  }

  moveForward() {
    this.setState({ step: this.state.step + 1 });
  }

  moveBackwards() {
    this.setState({ step: this.state.step - 1 });
  }

  render() {
    var step = this.state.step;
    return (
      <div className="reflectionPage">
        {step !== 1 && (
          <div
            className="button borderRadius25px marginTop30px marginLeft30px"
            onClick={this.moveBackwards}
          >
            Back
          </div>
        )}
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={3}>
            <div className="header paddingTop30px">Reflection Page</div>
        <div className="body paddingTop10px">Step {step} of 4</div>
            {step == 1 && (
              <MCQuestion
                question="What activity was done?"
                option1="Learning vocabulary"
                option2="Learning AAC"
              />
            )}
            {step == 2 && <StandardQuestion question="What went well?" />}
            {step == 3 && (
              <MCQuestion
                question="What didn't go well?"
                option1="My child did not interact with the device"
                option2="The device was not working"
              />
            )}
            {step == 4 && (
              <div>
                <StandardQuestion question="What can be improved?" />
                <div
                  className="button borderRadius25px marginTop30px"
                  onClick={this.handleSubmit}
                >
                  Submit
                </div>
              </div>
            )}
            {step !== 4 && (
              <div
                className="button borderRadius25px marginTop30px"
                onClick={this.moveForward}
              >
                Next
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Reflection;
