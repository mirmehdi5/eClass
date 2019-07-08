import React from "react";
import Quiz from "react-quiz-component";
import { quiz } from "./quiz";
const onCompleteAction = obj => {
  console.log(obj);
  return <div>Done!!!!!</div>;
};
class SubQuiz extends React.Component {
  state = {
    MainQuiz: quiz
  };

  render() {
    return (
      <div>
        <h1>Contact</h1>
        <Quiz
          quiz={this.state.MainQuiz}
          showInstantFeedback={true}
          onComplete={onCompleteAction}
        />
      </div>
    );
  }
}
export default SubQuiz;
