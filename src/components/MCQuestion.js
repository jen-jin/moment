import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// TODO: May need to delete
class MCQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      op1: false,
      op2: false,
      op3: false,
      op4: false,
      op5: false
    };
  }

  render() {
    const { op1, op2, op3, op4, op5 } = this.state;

    return (
      <div className="paddingTop30px">
        <div className="body paddingBottom10px">{this.props.question}</div>
        <FormControl component="fieldset" className="formControl">
          <FormLabel component="legend">Select all that apply</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={op1}
                  onChange={e => this.setState({ op1: !op1 })}
                  value={this.props.option1}
                />
              }
              label={this.props.option1}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={op2}
                  onChange={e => this.setState({ op2: !op2 })}
                  value={this.props.option2}
                />
              }
              label={this.props.option2}
            />
            {this.props.option3 && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={op3}
                    onChange={e => this.setState({ op3: !op3 })}
                    value={this.props.option3}
                  />
                }
                label={this.props.option3}
              />
            )}
            {this.props.option4 && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={op4}
                    onChange={e => this.setState({ op4: !op4 })}
                    value={this.props.option4}
                  />
                }
                label={this.props.option4}
              />
            )}
            {this.props.option5 && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={op5}
                    onChange={e => this.setState({ op5: !op5 })}
                    value={this.props.option5}
                  />
                }
                label={this.props.option5}
              />
            )}
          </FormGroup>
        </FormControl>
        <div className="paddingTop10px" />
        <TextField
          id="outlined-multiline-static"
          multiline
          rows="5"
          variant="outlined"
          placeholder="Add additional comments"
          inputProps={{
            style: { fontFamily: "Open Sans", fontSize: 15, width: 500 }
          }}
        />
      </div>
    );
  }
}

export default MCQuestion;
