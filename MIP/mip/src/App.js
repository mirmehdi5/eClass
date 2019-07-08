import React, { Component } from "react";
import "./App.css";
import "../node_modules/video-react/dist/video-react.css";
import Menu from "./components/menu";
class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Menu />
      </div>
    );
  }
}

export default App;
