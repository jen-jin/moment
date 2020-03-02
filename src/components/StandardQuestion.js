import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';

class StandardQuestion extends Component {
    render(props) {
        return (
            <div className="paddingTop30px" style={{ width: 900 }}>
                <div className="body bodyBold">{this.props.question}</div>
                <div className="paddingTop10px"/>
                <TextField 
                id="outlined-multiline-static"
                multiline
                rows="5"
                variant="outlined"
                placeholder={this.props.placeholder}
                inputProps={{
                  style: {fontFamily: 'Open Sans', fontSize: 15, width: 800} 
                }}
              />
            </div>
        );
    }
}

export default StandardQuestion;