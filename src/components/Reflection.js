import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { AuthContext } from "../context/AuthContext";

class Reflection extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      goals: []
    };

    this.createReflection = this.createReflection.bind(this);
  }

  createReflection() {
    this.props.history.push("/reflection/createReflection");
  }

  render() {
    return (
      <div className="reflectionLog">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={8}>
            <div className="header paddingTop30px">Reflection</div>
            <div className="helper paddingTop10px">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className="button buttonWidth150px borderRadius25px marginTop30px marginBottom30px rightAlign" onClick={this.createReflection}>
              + Add Reflection
            </div>
          </Grid>
          <Grid item xs={8}>
          <div className="helper paddingTop30px">You haven't created any reflections yet. Click the + Add Reflection button to create a new reflection</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Reflection;
