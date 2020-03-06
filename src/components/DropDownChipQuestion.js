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

    this.state = {
      selected: this.props.selected
    };

    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(event) {
    const item = event.target.value;

    this.setState(
      {
        selected: item
      },
      () => this.callBackSelectionChanged()
    );
  }

  async callBackSelectionChanged() {
    await this.props.onSelectionChange(this.state.selected);
  }

  render() {
    const content = this.props.content;
    const key1 = this.props.key1;
    const key2 = this.props.key2;

    const selected = this.state.selected;

    return (
      <div className="paddingTop30px">
        <Grid item xs={12}>
          <div className="body bodyBold">{this.props.question}</div>
          <div className="helper paddingTop10px paddingBottom10px">
            {this.props.helper}
          </div>
          {this.props.subheading !== null && (
            <div className="helper marginTopNegative30px">
              {this.props.subheading}
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl className="drop-down-chip" style={{ width: 900 }}>
            <InputLabel id="demo-mutiple-chip-label">
              {this.props.placeholder}
            </InputLabel>
            <Select
              id="chip-type-select"
              multiple
              value={selected}
              onChange={this.handleSelection}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className="chips">
                  {selected.map(info => (
                    <Chip key={info} label={info} className={"chip-" + info} />
                  ))}
                </div>
              )}
            >
              {content.map(info => (
                <MenuItem value={key2 !== null ? info[key1][key2] : info[key1]}>
                  {key2 !== null ? info[key1][key2] : info[key1]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </div>
    );
  }
}

export default DropDownChipQuestion;
