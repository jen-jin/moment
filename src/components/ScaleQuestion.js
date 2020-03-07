import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

class ScaleQuestion extends Component {
  constructor(props) {
    super(props);

    const responses = this.props.effectiveness;

    this.state = {
      veryIneffectively: responses.veryIneffectively,
      ineffectively: responses.ineffectively,
      somewhatEffectively: responses.somewhatEffectively,
      effectively: responses.effectively,
      veryEffectively: responses.veryEffectively
    };

    this.clickedScale = this.clickedScale.bind(this);
  }

  clickedScale(value) {
    switch (value) {
      case "Very ineffectively":
        this.setState(
          {
            veryIneffectively: !this.state.veryIneffectively,
            ineffectively: false,
            somewhatEffectively: false,
            effectively: false,
            veryEffectively: false
          },
          () => this.callBackEffectivenessChanged()
        );
        break;
      case "Ineffectively":
        this.setState(
          {
            ineffectively: !this.state.ineffectively,
            veryIneffectively: false,
            somewhatEffectively: false,
            effectively: false,
            veryEffectively: false
          },
          () => this.callBackEffectivenessChanged()
        );
        break;
      case "Somewhat effectively":
        this.setState(
          {
            somewhatEffectively: !this.state.somewhatEffectively,
            ineffectively: false,
            veryIneffectively: false,
            effectively: false,
            veryEffectively: false            
            
          },
          () => this.callBackEffectivenessChanged()
        );
        break;
      case "Effectively":
        this.setState(
          {
            effectively: !this.state.effectively,
            somewhatEffectively: false,
            ineffectively: false,
            veryIneffectively: false,
            veryEffectively: false                  
          },
          () => this.callBackEffectivenessChanged()
        );
        break;
      case "Very Effectively":
        this.setState(
          {
            veryEffectively: !this.state.veryEffectively,
            effectively: false,
            somewhatEffectively: false,
            ineffectively: false,
            veryIneffectively: false          
          },
          () => this.callBackEffectivenessChanged()
        );
    }
  }

  async callBackEffectivenessChanged() {
    await this.props.onEffectivenessChange(this.state);
  }

  render() {
    const responses = this.state;
    const scaleArray = [
      {
        value: "1",
        title: "Very ineffectively",
        active: responses.veryIneffectively
      },
      { value: "2", title: "Ineffectively", active: responses.ineffectively },
      {
        value: "3",
        title: "Somewhat effectively",
        active: responses.somewhatEffectively
      },
      { value: "4", title: "Effectively", active: responses.effectively },
      {
        value: "5",
        title: "Very Effectively",
        active: responses.veryEffectively
      }
    ];

    const effectiveScale = scaleArray.map(scale => {
      return (
        <Grid item>
          <Card
            className={
              "buttonWidth115px buttonHeight110px marginBottom10px card-" +
              scale.title
            }
            style={{
              textAlign: "center",
              backgroundColor: scale.active ? "#e1f3fc" : "#FAFAFA"
            }}
            variant="outlined"
          >
            <CardActionArea
              onClick={() => this.clickedScale(scale.title)}
              value="testing"
            >
              <CardContent>
                <div className="display paddingBottom10px">{scale.value}</div>
                <div className="helper">{scale.title}</div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });

    return (
      <div className="paddingTop30px">
        <Grid item>
          <div className="body bodyBold paddingBottom10px">
            {this.props.question}
          </div>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={5}
            item
            direction="row"
            className="paddingTop10px"
            alignContent="center"
            justify="start"
          >
            {effectiveScale}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ScaleQuestion;
