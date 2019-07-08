import React, { Component } from "react";
class Completed extends Component {
  state = {};
  render() {
    if (this.props.status === true) return <span>Completed</span>;
    else return <span>Not Completed</span>;
  }
}

export default Completed;
