import React, { Component } from "react";
import { Redirect } from "react-router";
import { Route, BrowserRouter as Router } from "react-router-dom";
import CourseContent from "./courseContent";

class PreAssesment extends Component {
  state = {
    relationship: "",
    interestedTopics: [],
    completed: false,
    questions: {
      one: {
        question: "Please select all the statements that apply to you.",
        options: ["I am a parent", "I am a grandparent", "None of the above"]
      },
      two: {
        question: "Please select all the topics that you are interested in. ",
        options: [
          "Effects of a relationship breakdown",
          "Legal issues",
          "Dispute resolution outside of court",
          "Using Court for dispute resolution",
          "Parenting",
          "Legal issues involving children",
          "Parenting plans"
        ]
      }
    }
  };

  render() {
    console.log("check");
    if (this.state.completed === true) {
      return this.redirectToCourse();
    } else {
      return (
        <div>
          <h1>Pre-Assesment Question</h1>
          {this.state.relationship === ""
            ? this.renderQuestionOne()
            : this.state.completed
            ? this.redirectToCourse()
            : this.renderQuestionTwo()}
        </div>
      );
    }
  }

  redirectToCourse = () => {
    return (
      <Router>
        <Redirect to="/course-content" />
        <Route path="/course-content" component={CourseContent} />
      </Router>
    );
  };

  renderQuestionOne = () => {
    return (
      <div>
        <div>{this.state.questions.one.question}</div>
        <ul>
          {this.state.questions.one.options.map((value, index) => {
            return (
              <li key={index}>
                <input
                  type="radio"
                  value={value}
                  checked={this.state.relationship === { value }}
                  onChange={this.radioChange}
                />
                {value}
              </li>
            );
          })}

          <h3>this.state.relationship: {this.state.relationship}</h3>
        </ul>
      </div>
    );
  };

  renderQuestionTwo = () => {
    return (
      <div>
        <form>
          <ul>
            {this.state.questions.two.options.map((value, index) => {
              return (
                <li key={index} className="input-group">
                  <label>{value}</label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={this.onChange}
                  />
                </li>
              );
            })}

            <h3>
              <div className="selected-items">
                {this.state.interestedTopics.map(number => (
                  <p key={number}>item: {number}</p>
                ))}
              </div>
            </h3>
          </ul>
          <button onClick={this.onPreAssesmemntSubmit}>Submit</button>
        </form>
      </div>
    );
  };
  onPreAssesmemntSubmit = () => {
    this.setState({ completed: true });
  };

  onChange = e => {
    const interestedTopics = [...this.state.interestedTopics];
    let index;
    if (e.target.checked) {
      interestedTopics.push(e.target.value);
    } else {
      index = interestedTopics.indexOf(e.target.value);
      interestedTopics.splice(index, 1);
    }
    this.setState({ interestedTopics });
  };

  radioChange = e => {
    this.setState({
      relationship: e.currentTarget.value
    });
  };
}

export default PreAssesment;
