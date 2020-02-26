import React, { Component } from "react";
import Resource from "./Resource";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { DEFAULT_HEADERS, RESOURCES_PATH, SUCCESS } from "../constants";

class Resources extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      resources: [],
      isLoaded: false,
      error: null,
      searchTerm: "",
      typing: false,
      typingTimeout: 0,
      isSearching: false
    };

    this.searchUpdated = this.searchUpdated.bind(this);
  }

  componentDidMount() {
    // const { userId } = this.context; // Will need this when they favourite resources
    axios.get(RESOURCES_PATH, { headers: DEFAULT_HEADERS }).then(
      response => {
        if (response.data.status == SUCCESS && response.data.data != []) {
          this.setState({
            isLoaded: true,
            resources: response.data.data
          });
        } else {
          this.setState({
            isLoaded: true,
            error: "No resources found."
          });
        }
      },
      error => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    );
  }

  sendToSearch() {
    // TODO: Call API with search term, below is just a mock
    console.log("API CALL - Search Term: " + this.state.searchTerm);
    this.setState({
      isSearching: true
    });

    setTimeout(() => {
      this.setState({
        isSearching: false
      });
    }, 1000);
  }

  searchUpdated(event) {
    const searchTerm = event.target.value;

    // Only call API when the user is done typing, wait 1s
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      searchTerm: searchTerm,
      typing: false,
      typingTimeout: setTimeout(() => {
        this.sendToSearch();
      }, 1000)
    });
  }

  render() {
    const { resources, isLoaded, error, searchTerm, isSearching } = this.state;
    return (
      <div className="resourcesPage">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={8}>
            <div className="header paddingTop30px">Exploring Resources</div>
            <div className="helper paddingTop10px paddingBottom10px">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <Divider variant="middle" />
          </Grid>
          {error && <div className="body">Error: {error.message}</div>}
          {!isLoaded && <div className="body">Loading...</div>}
          {isLoaded && !error && (
            <Grid
              container
              item
              xs={8}
              direction="row"
              className="paddingTop10px"
              alignContent="center"
              justify="space-evenly"
            >
              <Grid item xs={12}>
                <Paper component="form" className="searchBar">
                  <InputBase
                    className="searchInput"
                    placeholder="Search..."
                    fullWidth={true}
                    onChange={this.searchUpdated}
                    inputProps={{
                      style: {
                        fontFamily: "Open Sans",
                        fontSize: 15
                      }
                    }}
                  />
                </Paper>
              </Grid>
              {isSearching && <div className="body">Searching...</div>}
              {!isSearching &&
                resources.map(link => <Resource key={link.id} link={link} />)}
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default Resources;
