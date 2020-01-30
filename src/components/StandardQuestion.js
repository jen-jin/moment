import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';

class StandardQuestion extends Component {
    render(props) {
        return (
            <div className="paddingTop30px">
                <div className="body">{this.props.question}</div>
                <div className="paddingTop10px" />
                <TextField 
                id="outlined-multiline-static"
                multiline
                rows="5"
                variant="outlined"
                placeholder="Add your answer here"
                inputProps={{
                  style: {fontFamily: 'Open Sans', fontSize: 15, width: 300} 
                }}
              />
            </div>
        );
    }
}

export default StandardQuestion;