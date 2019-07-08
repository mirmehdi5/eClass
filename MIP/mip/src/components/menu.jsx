import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PreAssesment from "./preAssesment";
import SubQuiz from "./subQuiz";
import CourseContent from "./courseContent";

class Menu extends Component {
  state = {};
  render() {
    return (
      <div>
        <Router>
          <nav role="navigation">
            <div id="menuToggle">
              <input type="checkbox" ref={"hamburger"} />

              <span />
              <span />
              <span />

              <ul id="menu">
                <li>
                  <Link
                    to={"/preassesment"}
                    className="nav-link"
                    onClick={this.closeMenu}
                  >
                    PreAssesment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/subquiz"
                    className="nav-link"
                    onClick={this.closeMenu}
                  >
                    SubQuiz
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/course-content"}
                    className="nav-link"
                    onClick={this.closeMenu}
                  >
                    Course Content
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div>
            <Switch>
              <Route path="/preassesment" component={PreAssesment} />
              <Route path="/subquiz" component={SubQuiz} />
              <Route path="/course-content" component={CourseContent} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

  closeMenu = () => {
    let ref = "hamburger";
    this.refs[ref].checked = !this.refs[ref].checked;
  };
}

export default Menu;
