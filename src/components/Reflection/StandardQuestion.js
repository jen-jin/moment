import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class StandardQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content
    };

    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleContentChange(event) {
    const content = event.target.value;
    this.setState(
      {
        content: content
      },
      () => this.callBackContentChanged()
    );
  }

  async callBackContentChanged() {
    await this.props.onContentChange(this.state.content);
  }

  render() {
    const content = this.state.content;

    return (
      <div
        className={
          this.props.question == null ? "additional-space" : "paddingTop30px"
        }
        style={{ width: 900 }}
      >
        <div className="body bodyBold">{this.props.question}</div>
        {this.props.helper != null && (
          <div className="helper paddingTop10px paddingBottom10px">
            {this.props.helper}
          </div>
        )}
        <div className="paddingTop10px" />
        <TextField
          id="outlined-multiline-static"
          multiline
          rows="5"
          variant="outlined"
          placeholder={this.props.placeholder}
          defaultValue={content !== null ? content : null}
          onChange={this.handleContentChange}
          inputProps={{
            style: { fontFamily: "Open Sans", fontSize: 15, width: 800 }
          }}
        />
      </div>
    );
  }
}

export default StandardQuestion;
