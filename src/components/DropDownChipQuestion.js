import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";

class DropDownChipQuestion extends Component {
  constructor(props) {
    super(props);

    this.handleSelection = this.handleSelection.bind(this);
    this.handleUnselection = this.handleUnselection.bind(this);
  }

  handleSelection(event) {
    this.props.onSelection(event.target.value);
  }

  // TODO: Remove if not possible
  handleUnselection(event) {
      console.log("Deleting chip " + event)
  }

  render() {
    const content = this.props.content;
    const key1 = this.props.key1;
    const key2 = this.props.key2;

    console.log("Goal length" + this.props.content.length);

    return (
      <div className="paddingTop30px">
        <Grid item xs={12}>
          <div className="body bodyBold">{this.props.question}</div>
          <div className="helper paddingTop10px paddingBottom10px">
            {this.props.helper}
          </div>
        </Grid>
        <Grid item xs={12}>
          <FormControl className="drop-down-chip" style={{ width: 800 }}>
            <InputLabel id="demo-mutiple-chip-label">
              {this.props.placeholder}
            </InputLabel>
            <Select
              id="chip-type-select"
              onChange={this.handleSelection}
              multiple
              value={content}
              displayEmpty
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className="chips">
                  {selected.map(info => (
                    <Chip
                      key={key2 !== null ? info[key1][key2]: info[key1]} // TODO: Unique key
                      label={key2 !== null ? info[key1][key2]: info[key1]}
                      className={"chip-" + key2 !== null ? info[key1][key2]: info[key1]}
                      onDelete={this.handleUnselection} // TODO: Remove if not posssible
                      clickable
                    />
                  ))}
                </div>
              )}
            >
              {content.map(info => (
                <MenuItem value={key2 !== null ? info[key1][key2]: info[key1]}>{key2 !== null ? info[key1][key2]: info[key1]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </div>
    );
  }
}

export default DropDownChipQuestion;
