import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import logo from "../img/logo.jpg"; // This is temp

class Resource extends Component {
  constructor(props) {
    super(props);

    this.favourite = this.favourite.bind(this);
    this.openLink = this.openLink.bind(this);
  }

  favourite() {
    // Handle favouriting resource
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
              <CardMedia className="cardMediaSize" title="Image" onClick={this.openLink}>
                <img src={this.props.link.img} className="cardImage"/>
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
              <Button size="large" style={{ color: "#1378C1" }}>
                BOOKMARK
              </Button>
              <Button size="large" onClick={this.openLink} style={{ color: "#1378C1" }}>
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
