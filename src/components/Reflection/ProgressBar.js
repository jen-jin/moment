import React, { Component } from "react";
import styled from "styled-components";

const Tracker = styled.div`
  width: 250px;
  height: 20px;
  margin: 15px auto;
  background: #87b6ca80;
  border-radius: 15px;
`;

const ProgressInTracker = styled.div`
  width: ${props => props.percentage}%;
  height: 20px;
  background: #1378c1;
  border-radius: 15px;
  transition: width 0.3s ease-in-out;
`;

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.clamp = this.clamp.bind(this);
  }

  clamp(min, value, max) {
    return Math.min(Math.max(min, value), max);
  }

  render() {
    return (
      <Tracker>
        <ProgressInTracker
          percentage={this.clamp(0, this.props.percentage, 100)}
        />
      </Tracker>
    );
  }
}

export default ProgressBar;
