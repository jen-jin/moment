import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    window.open(this.props.link.link)
  }

  render() {
    return (
      <div>
        <Grid item xs={12}>
          <Card className="card">
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={logo}
                title="Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {this.props.link.id + " Title"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Category: {this.props.link.category ?? "none"}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Tags: {this.props.link.tags}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Favourite
              </Button>
              <Button size="small" color="primary" onClick={this.openLink}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default Resource;
