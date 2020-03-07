import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  REFLECTION_PATH,
  DEFAULT_HEADERS,
  SUCCESS,
  DATE_OPTIONS
} from "../constants";

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
    this.createTableData = this.createTableData.bind(this);
    this.createReflectionData = this.createReflectionData.bind(this);
    this.createDateFormat = this.createDateFormat.bind(this);
  }

  // MARK: - Lifecycle

  componentDidMount() {
    const { userId } = this.context;

    console.log("User ID: " + userId);

    axios
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

  async createTableData() {
    await this.state.reflections.map(reflection => {
      const data = this.createReflectionData(reflection);
      this.setState(prevState => ({
        rows: [...prevState.rows].concat(data)
      }));
    });
  }

  createDateFormat(date) {
    return new Date(date).toLocaleString([], DATE_OPTIONS);
  }

  createReflectionData(reflection) {
    const title = reflection.title;
    const dateCreated = this.createDateFormat(reflection.date_created);
    const lastModified =
      reflection.last_modified == null
        ? dateCreated
        : this.createDateFormat(reflection.last_modified);

    const actions = (
      <>
        <span className="pointer" onClick={() => console.log("View")}>
          View
        </span>
        <span
          className="marginLeft10px pointer"
          onClick={() => console.log("Delete")}
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

  render() {
    const { reflections, page, rowsPerPage, rows } = this.state;

    const columns = [
      { id: "title", label: "Name", minWidth: 170 },
      {
        id: "dateCreated",
        label: "Date Created",
        minWidth: 170,
        align: "center"
      },
      {
        id: "lastModified",
        label: "Last Modified",
        minWidth: 170,
        align: "center"
      },
      {
        id: "actions",
        label: "Actions",
        minWidth: 170,
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
          <Grid item xs={8}>
            <div className="header paddingTop30px">Reflection</div>
            <div className="helper paddingTop10px">
            <span className="bodyBold">
              “Examining your thoughts is an important part of the practice of self-reflections” - Ryuho Okawa
              </span>
              <br />
              Use this space to reflect on your progress in using alternative augmentative communication with your child. 
              Explore the success, challenges, and improvements in your journey.
            </div>
            <div
              className="button buttonWidth150px borderRadius25px marginTop30px marginBottom30px rightAlign"
              onClick={this.createReflection}
            >
              + Add Reflection
            </div>
          </Grid>
          <Grid item xs={8}>
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

export default Reflection;
