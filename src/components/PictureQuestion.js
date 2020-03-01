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
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

class PictureQuestion extends Component {
  constructor(props) {
    super(props);
    
    this.clickedEmoji = this.clickedEmoji.bind(this);
  }

  clickedEmoji(title) {
    this.props.onMoodChange(title)
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
            <CardActionArea onClick={() => this.clickedEmoji(emoji.title)} value="testing">
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
