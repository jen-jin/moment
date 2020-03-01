import React, { Component } from "react";
import angryEmoji from "../img/emojis/angry.svg";
import excitedEmoji from "../img/emojis/excited.svg";
import goodEmoji from "../img/emojis/good.svg";
import happyEmoji from "../img/emojis/happy.svg";
import mehEmoji from "../img/emojis/meh.svg";
import sadEmoji from "../img/emojis/sad.svg";
import stressedEmoji from "../img/emojis/stressed.svg";
import worriedEmoji from "../img/emojis/worried.svg";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

class PictureQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      excited: false,
      happy: false,
      good: false,
      meh: false,
      worried: false,
      sad: false,
      stressed: false,
      angry: false
    };

    this.clickedEmoji = this.clickedEmoji.bind(this);
  }

  clickedEmoji(title) {
    switch (title) {
      case "Excited":
        this.setState({
          excited: !this.state.excited
        }, () => this.callBackMoodChanged());
        break
      case "Happy":
        this.setState({
          happy: !this.state.happy
        }, () => this.callBackMoodChanged());
        break
      case "Good":
        this.setState({
          good: !this.state.good
        }, () => this.callBackMoodChanged());
        break
      case "Meh":
        this.setState({
          meh: !this.state.meh
        }, () => this.callBackMoodChanged());
        break
      case "Worried":
        this.setState({
          worried: !this.state.worried
        }, () => this.callBackMoodChanged());
        break
      case "Sad":
        this.setState({
          sad: !this.state.sad
        }, () => this.callBackMoodChanged());
        break
      case "Stressed":
        this.setState({
          stressed: !this.state.stressed
        }, () => this.callBackMoodChanged());
        break
      case "Angry":
        this.setState({
          angry: !this.state.angry
        }, () => this.callBackMoodChanged());
    }    
  }

  async callBackMoodChanged() {
    await this.props.onMoodChange(this.state)
  }

  render(props) {
    const emojiArray = [
      { photo: excitedEmoji, title: "Excited" },
      { photo: happyEmoji, title: "Happy" },
      { photo: goodEmoji, title: "Good" },
      { photo: mehEmoji, title: "Meh" },
      { photo: worriedEmoji, title: "Worried" },
      { photo: sadEmoji, title: "Sad" },
      { photo: stressedEmoji, title: "Stressed" },
      { photo: angryEmoji, title: "Angry" }
    ];

    const emojis = emojiArray.map(emoji => {
      return (
        <Grid item>
          <Card
            className={"buttonWidth75px card-" + emoji.title}
            style={{ textAlign: "center" }}
            variant="outlined"
          >
            <CardActionArea
              onClick={() => this.clickedEmoji(emoji.title)}
              value="testing"
            >
              <CardMedia>
                <img src={emoji.photo} />
              </CardMedia>
              <CardContent style={{ padding: 0 }}>
                <div className="helper">{emoji.title}</div>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });

    return (
      <div className="paddingTop30px">
        <Grid item>
          <div className="body bodyBold">1. How are you feeling today?</div>
          <div className="helper">Choose as many as you like</div>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={5}
            item
            direction="row"
            className="paddingTop10px"
            alignContent="center"
            justify="space-evenly"
          >
            {emojis}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PictureQuestion;
