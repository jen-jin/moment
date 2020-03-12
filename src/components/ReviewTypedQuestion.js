import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class ReviewTypedQuestion extends Component {
  render() {
    return (
      <div className="paddingTop30px">
        <Grid item>
          <div className="body">{this.props.question}</div>
        </Grid>
        <Grid item>
          <div className="paddingTop10px" />
          <div className="helper blue marginLeft10px">
            {this.props.content !== "" ? this.props.content : "Not answered."}
          </div>
        </Grid>
      </div>
    );
  }
}

export default ReviewTypedQuestion;
