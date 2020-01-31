import React, { Component } from "react";
import MCQuestion from "./MCQuestion";
import Grid from "@material-ui/core/Grid";

class ReflectionTest2 extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleSubmit() {
    // Send an email to yourself
  }

  handleBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="reflectionPage2">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={3}>
            <div className="header paddingTop30px marginTop30px">
              Reflection Page
            </div>
            <div
              className="button borderRadius25px marginTop30px"
              onClick={this.handleBack}
            >
              Back
            </div>
            <MCQuestion question="What didn't go well?" />
            <div
              className="button borderRadius25px marginTop30px"
              onClick={this.handleSubmit}
            >
              Submit
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ReflectionTest2;
