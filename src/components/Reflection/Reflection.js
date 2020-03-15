import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { withSnackbar } from "notistack";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {
  REFLECTION_PATH,
  DEFAULT_HEADERS,
  SUCCESS,
  DATE_OPTIONS
} from "../../constants";

class Reflection extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      reflections: [],
      page: 0,
      rows: [],
      rowsPerPage: 10
    };

    this.createReflection = this.createReflection.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.fetchReflections = this.fetchReflections.bind(this);
    this.createTableData = this.createTableData.bind(this);
    this.createReflectionData = this.createReflectionData.bind(this);
    this.createDateFormat = this.createDateFormat.bind(this);
    this.delete = this.delete.bind(this);
    this.view = this.view.bind(this);
    this.convertUTCDateToLocalDate = this.convertUTCDateToLocalDate.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  // MARK: - Lifecycle
  componentDidMount() {
    this.fetchReflections();
  }

  // MARK: - Fetching Reflections
  async fetchReflections() {
    const { userId } = this.context;

    console.log("User ID: " + userId);

    await axios
      .get(REFLECTION_PATH + "/" + parseInt(userId), {
        headers: DEFAULT_HEADERS
      })
      .then(
        response => {
          if (response.data.status == SUCCESS) {
            this.setState(
              {
                reflections: response.data.data
              },
              () => this.createTableData()
            );
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  // MARK: - Table Changes
  handleChangePage(event, newPage) {
    this.setState({
      page: newPage
    });
  }

  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage: +event.target.value,
      page: 0
    });
  }

  // MARK: - Creating Table
  async createTableData() {
    await this.state.reflections.map(reflection => {
      const data = this.createReflectionData(reflection);
      this.setState(prevState => ({
        rows: [...prevState.rows].concat(data)
      }));
    });
  }

  createDateFormat(date) {
    // Timestamp from API is in UTC, must convert to local
    return this.convertUTCDateToLocalDate(new Date(date)).toLocaleString(
      "en-US",
      DATE_OPTIONS
    );
  }

  // MARK: - Delete Reflection
  confirmDelete(reflectionID) {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      this.delete(reflectionID);
    }
  }

  delete(reflectionID) {
    axios
      .delete(REFLECTION_PATH, {
        headers: DEFAULT_HEADERS,
        data: {
          reflection_id: reflectionID
        }
      })
      .then(
        response => {
          if (response.data.status == SUCCESS) {
            this.setState(
              {
                // Clear all rows before fetching again
                rows: []
              },
              () => this.fetchReflections()
            );
          }
          this.props.enqueueSnackbar("Successfully deleted the reflection", {
            variant: "success"
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  // MARK: - View Reflections
  view(title, dateCreated, reflectionID, reflection) {
    this.props.history.push("/reflection/viewReflection", [title, dateCreated, reflectionID, reflection]);
  }

  // MARK: - Reflection Data Helpers
  convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  createReflectionData(reflection) {
    const title = reflection.title;
    const dateCreated = this.createDateFormat(reflection.date_created);
    const reflectionID = reflection.id;
    const lastModified =
      reflection.last_modified == null
        ? dateCreated
        : this.createDateFormat(reflection.last_modified);

    const actions = (
      <>
        <span className="pointer" onClick={() => this.view(title, dateCreated, reflectionID, reflection.reflection)}>
          View
        </span>
        <span
          className="marginLeft10px pointer"
          onClick={() => this.confirmDelete(reflectionID)}
        >
          Delete
        </span>
      </>
    );

    return { title, dateCreated, lastModified, actions };
  }

  createReflection() {
    this.props.history.push("/reflection/createReflection");
  }

  // MARK: - Render
  render() {
    const { reflections, page, rowsPerPage, rows } = this.state;

    const columns = [
      { id: "title", label: "Name", minWidth: 180 },
      {
        id: "dateCreated",
        label: "Date Created",
        minWidth: 180,
        align: "center"
      },
      {
        id: "lastModified",
        label: "Last Modified",
        minWidth: 180,
        align: "center"
      },
      {
        id: "actions",
        label: "Actions",
        minWidth: 180,
        align: "center"
      }
    ];

    return (
      <div className="reflectionLog">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} style={{ width: "100%" }}>
            <div className="header paddingTop60px">Reflection</div>
            <div className="helper">
              Use this space to reflect on your progress in using AAC with your
              child. Explore the success, challenges, and improvements in your
              journey.
            </div>
            <div className="helper paddingTop30px paddingBottom10px">
              <span className="bodyBold">
                “Examining your thoughts is an important part of the practice of
                self-reflections” - Ryuho Okawa
              </span>
            </div>
            <Button
              className="button rightAlign"
              variant="contained"
              onClick={this.createReflection}
            >
              + Add Reflection
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ width: reflections.length > 0 ? "100%" : "auto" }}
          >
            {reflections.length > 0 && (
              <Paper className="table">
                <TableContainer
                  className="table-container"
                  style={{ maxHeight: 450 }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map(column => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map(row => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map(column => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={
                                      column.id == "actions"
                                        ? { color: "#1378C1" }
                                        : { color: "#2A2A2A" }
                                    }
                                  >
                                    {value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </Paper>
            )}

            {reflections.length == 0 && (
              <div className="helper paddingTop30px">
                You haven't created any reflections yet. Click the + Add
                Reflection button to create a new reflection
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withSnackbar(Reflection);
