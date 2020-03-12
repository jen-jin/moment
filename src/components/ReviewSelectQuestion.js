import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class ReviewSelectQuestion extends Component {
  render() {
    return (
      <div className="paddingTop30px">
        <Grid item>
          <div className="body">{this.props.question}</div>
        </Grid>
        <Grid item>
          <div className="paddingTop10px" />
          {this.props.content.length > 0 &&
            this.props.content.map(item => (
              <div className="helper blue marginLeft10px">{item}</div>
            ))}
          {this.props.content.length === 0 && <div className="helper blue marginLeft10px">Not answered.</div>}
          <div className="helper blue marginLeft10px">
            {this.props.additional}
          </div>
        </Grid>
      </div>
    );
  }
}

export default ReviewSelectQuestion;
