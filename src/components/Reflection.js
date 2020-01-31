import React, { Component } from "react";
import StandardQuestion from "./StandardQuestion";
import Grid from "@material-ui/core/Grid";

class Reflection extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    this.props.history.push("/reflection2");
  }

  render() {
    return (
      <div className="reflectionPage">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={3}>
            <div className="header paddingTop30px">Reflection Page</div>
            <StandardQuestion question="What went well?" />
            <div
              className="button borderRadius25px marginTop30px"
              onClick={this.handleNext}
            >
              Next
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Reflection;