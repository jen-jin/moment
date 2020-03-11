import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  DEFAULT_HEADERS,
  SUCCESS,
  BOOKMARKED_RESOURCES_PATH
} from "../constants";

class Resource extends Component {
  constructor(props) {
    super(props);

    this.handleBookmark = this.handleBookmark.bind(this);
    this.openLink = this.openLink.bind(this);
  }

  async handleBookmark() {
    const { userId } = this.context;
    await axios({
      method: "put",
      url: BOOKMARKED_RESOURCES_PATH,
      data: {
        user_id: userId,
        resource_id: this.props.link.id,
        is_bookmarked: !this.props.link.is_bookmarked
      },
      headers: { DEFAULT_HEADERS }
    })
      .then(response => {
        if (response.data.status === SUCCESS) {
          console.log(response.data.message);
        } else {
          // Unable to process success
        }
      })
      .catch(error => {
        // TODO: Better error handling, such as when they try and submit without internet
        console.log(error);
      });
  }

  openLink() {
    window.open(this.props.link.link);
  }

  render() {
    return (
      <div>
        <Grid item xs={4}>
          <Card className="card marginTop30px" variant="outlined">
            <CardActionArea>
              <CardMedia
                className="cardMediaSize"
                title="Image"
                onClick={this.openLink}
              >
                <img src={this.props.link.img} className="cardImage" />
              </CardMedia>
              <CardContent className="cardContent" onClick={this.openLink}>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.link.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Category: {this.props.link.category ?? "none"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="large"
                onClick={this.handleBookmark}
                style={{ color: "#1378C1" }}
              >
                {/* All Resources AND is_bookmarked = false */}
                {!this.props.link.is_bookmarked &&
                  this.props.currentTab === "All Resources" &&
                  "BOOKMARK"}
                {/* Bookmarked Resources OR is_bookmarked = true */}
                {(this.props.link.is_bookmarked ||
                  this.props.currentTab === "Bookmarked Resources") &&
                  "UNBOOKMARK"}
              </Button>
              <Button
                size="large"
                onClick={this.openLink}
                style={{ color: "#1378C1" }}
              >
                LEARN MORE
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default Resource;
