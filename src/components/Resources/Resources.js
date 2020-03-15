import React, { Component } from "react";
import Resource from "./Resource";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {
  DEFAULT_HEADERS,
  SUCCESS,
  SEARCH_PATH,
  RESOURCES_PATH_2,
  BOOKMARKED_RESOURCES_PATH
} from "../../constants";

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
      isSearching: false,
      currentTab: "All Resources"
    };

    this.fetchAllResources = this.fetchAllResources.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.searchAPI = this.searchAPI.bind(this);
    this.procressSearchTerm = this.procressSearchTerm.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleRefreshBookmarks = this.handleRefreshBookmarks.bind(this);
  }

  // MARK: - Lifecycle
  componentDidMount() {
    this.fetchAllResources();
  }

  // MARK: - Fetching Resources
  async fetchAllResources() {
    const { userId } = this.context; // Will need this when they favourite resources
    await axios
      .get(RESOURCES_PATH_2 + "/" + parseInt(userId), {
        headers: DEFAULT_HEADERS
      })
      .then(
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

  async fetchBookmarkedResources() {
    const { userId } = this.context;

    await axios
      .get(BOOKMARKED_RESOURCES_PATH + "/" + parseInt(userId), {
        headers: DEFAULT_HEADERS
      })
      .then(
        response => {
          if (response.data.status == SUCCESS && response.data.data != []) {
            this.setState({
              isLoaded: true,
              resources: response.data.data
            });
          } else {
            this.setState({
              isLoaded: true,
              error: "No bookmarked resources found"
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

  async fetchResourcesHelper() {
    const currentTab = this.state.currentTab;

    if (currentTab === "Bookmarked Resources") {
      await this.fetchBookmarkedResources();
    } else {
      await this.fetchAllResources();
    }
  }

  // MARK: - Searching for Resources
  async procressSearchTerm() {
    // Trim, Remove Special Characters, Replace Space with +
    const processedSearchTerm = this.state.searchTerm
      .trim()
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/\s+/g, "+");

    await this.setState({
      searchTerm: processedSearchTerm
    });
  }

  sendToSearch() {
    this.searchAPI();

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

  async searchAPI() {
    this.procressSearchTerm();

    const { userId } = this.context;
    const searchTermParam =
      this.state.searchTerm !== "" ? "/" + this.state.searchTerm : "";
    const params = "/" + parseInt(userId) + searchTermParam;

    const path =
      (searchTermParam !== "" ? SEARCH_PATH : RESOURCES_PATH_2) + params;

    axios.get(path, { headers: DEFAULT_HEADERS }).then(
      response => {
        if (response.data.status == SUCCESS && response.data.data != []) {
          this.setState({
            isLoaded: true,
            resources: response.data.data
          });
        } else {
          this.setState({
            // Note: This hides the search bar in my logic
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

  // MARK: - Tab Change
  handleTabChange(event, value) {
    this.setState(
      {
        currentTab: value
      },
      () => this.fetchResourcesHelper()
    );
  }

  async handleRefreshBookmarks() {
    if (this.state.currentTab === "Bookmarked Resources") {
      await this.fetchBookmarkedResources();
    }
  }

  // MARK: - Render
  render() {
    const {
      resources,
      isLoaded,
      error,
      isSearching,
      currentTab,
      searchTerm
    } = this.state;
    return (
      <div className="resourcesPage">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="flex-start"
          justify="center"
        >
          <Grid item xs={12}>
            <div className="header paddingTop60px">Exploring Resources</div>
            <div className="helper">
              We are here to support your journey with credible resources for
              your AAC related concerns. Search through our material and
              bookmark ones you like!
            </div>
            <div className="helper paddingTop30px paddingBottom10px">
              <span className="bodyBold">
                "Life is a journey, not a destination" - Ralph Waldo Emerson
              </span>
            </div>
          </Grid>

          {error && <div className="body">Error: {error.message}</div>}
          {!isLoaded && <LinearProgress className="width500px" />}

          {isLoaded && !error && (
            <Grid
              container
              item
              xs={12}
              direction="row"
              className="paddingTop10px"
              alignContent="center"
              justify="space-evenly"
            >
              <Grid item xs={12} style={{ width: "100%" }}>
                <Paper component="form" className="searchBar" elevation={3}>
                  <InputBase
                    className="searchInput"
                    placeholder="Search All Resources..."
                    fullWidth={true}
                    onChange={this.searchUpdated}
                    onKeyPress={ev => {
                      if (ev.key === "Enter") {
                        ev.preventDefault();
                        this.sendToSearch();
                      }
                    }}
                    inputProps={{
                      style: {
                        fontFamily: "Open Sans",
                        fontSize: 15
                      }
                    }}
                  />
                </Paper>
              </Grid>
              {!isSearching && (
                <Grid container item xs={12} direction="row">
                  <Grid item xs={8}>
                    <Tabs value={currentTab} onChange={this.handleTabChange}>
                      <Tab label="All Resources" value="All Resources" />
                      <Tab
                        label="Bookmarked Resources"
                        value="Bookmarked Resources"
                      />
                    </Tabs>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                item
                xs={12}
                direction="row"
                alignItems="center"
                justify="space-evenly"
              >
                {isSearching && <LinearProgress className="width500px" />}
                {!isSearching &&
                  resources.length > 0 &&
                  resources.map(link => (
                    <Resource
                      key={link.id}
                      link={link}
                      tab={currentTab}
                      onRefreshBookmarks={this.handleRefreshBookmarks}
                    />
                  ))}
                {!isSearching && resources.length == 0 && (
                  <div className="helper paddingTop30px">
                    You have no bookmarks. To create one, click the button
                    "BOOKMARK" on resources in the "All Resources" tab.
                  </div>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default Resources;
