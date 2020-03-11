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
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      is_bookmarked: this.props.link.is_bookmarked
    };
    this.handleBookmark = this.handleBookmark.bind(this);
    this.openLink = this.openLink.bind(this);
    this.determineRefresh = this.determineRefresh.bind(this);
  }

  handleBookmark() {
    this.setState(
      prevState => ({
        is_bookmarked: !prevState.is_bookmarked
      }),
      () => this.putBookmark()
    );
  }

  async putBookmark() {
    const { userId } = this.context;

    await axios({
      method: "put",
      url: BOOKMARKED_RESOURCES_PATH,
      data: {
        user_id: parseInt(userId),
        resource_id: this.props.link.id,
        is_bookmarked: this.state.is_bookmarked
      },
      headers: { DEFAULT_HEADERS }
    })
      .then(response => {
        if (response.data.status === SUCCESS) {
          console.log(response.data.message);
          this.determineRefresh();
        } else {
          // TODO: Better error handling, such as when they unsuccessfullly bookmark
          console.log(response.data.message);

          this.setState({
            is_bookmarked: false
          })
        }
      })
      .catch(error => {
        // TODO: Better error handling, such as when they try and bookmark without internet
        console.log(error);
        
        this.setState({
          is_bookmarked: false
        })
      });
  }

  openLink() {
    window.open(this.props.link.link);
  }

  determineRefresh() {
    if (this.props.tab === "Bookmarked Resources") {
      this.props.onRefreshBookmarks();
    }
  }

  render() {
    const { is_bookmarked } = this.state;
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
                {!is_bookmarked &&
                  this.props.tab === "All Resources" &&
                  "BOOKMARK"}
                {/* Bookmarked Resources OR is_bookmarked = true */}
                {(is_bookmarked || this.props.tab === "Bookmarked Resources") &&
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
