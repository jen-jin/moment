import React, { Component } from "react";
import StandardQuestion from "./StandardQuestion";
import MCQuestion from "./MCQuestion";
import Grid from '@material-ui/core/Grid';

class Reflection extends Component {
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
            <StandardQuestion question = "What went well?" />
          </Grid>
          <Grid item xs={3}>
            <MCQuestion question = "What didn't go well?" />
          </Grid>     

        </Grid>       
      </div>
    );
  }
}

export default Reflection;

/* 

*/