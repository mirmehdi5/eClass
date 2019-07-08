import React, { Component } from "react";
import { Player } from "video-react";
import Quiz from "react-quiz-component";
import { quiz } from "./quiz";

class VideoTutorial extends Component {
  constructor(props) {
    super(props);
    this.prevSrc = "";
    this.nextSrc = "";
    this.forwardLessonText = "";
    this.quizName = "";
  }

  state = {
    currSrc: this.props.videoSource,
    isQuiz: false
  };

  render() {
    if (this.state.isQuiz) {
      return (
        <div>
          <Quiz
            quiz={quiz}
            showInstantFeedback={true}
            onComplete={this.renderCustomResultPage}
            showDefaultResult={false}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Player
            autoPlay
            ref={player => {
              this.player = player;
            }}
            playsInline
            poster="/assets/poster.png"
            src={this.state.currSrc}
          />
          <button className="button button2" onClick={this.goToCourseContent}>
            Back To Course Content
          </button>

          {this.renderButtons()}
        </div>
      );
    }
  }

  goToCourseContent = () => {
    let result = {};
    result.type = "course";
    result.value = this.player.getState().player;
    this.props.onGoToCourseContent(result);
  };

  renderCustomResultPage = obj => {
    {
      let result = {};
      result.type = "quiz";
      result.value = obj;
      result.quizName = this.quizName;
      this.props.onGoToCourseContent(result);
    }
  };

  renderButtons = () => {
    let backLessonText = "";
    for (
      var currentModule = 0;
      currentModule < this.props.videoUrls.length;
      currentModule++
    ) {
      for (
        var currentLesson = 0;
        currentLesson < this.props.videoUrls[currentModule].Topic.length;
        currentLesson++
      ) {
        if (
          this.props.videoUrls[currentModule].Topic[currentLesson].type ===
            "course" &&
          this.props.videoUrls[currentModule].Topic[currentLesson].src ===
            this.state.currSrc
        ) {
          if (this.props.videoUrls[currentModule].Topic[currentLesson - 1]) {
            this.prevSrc = this.props.videoUrls[currentModule].Topic[
              currentLesson - 1
            ].src;
            backLessonText = "Previous Lesson";
          } else if (this.props.videoUrls[currentModule - 1]) {
            backLessonText = "Previous Module";
            if (
              this.props.videoUrls[currentModule - 1].Topic[
                this.props.videoUrls[currentModule - 1].Topic.length - 1
              ].type === "quiz"
            ) {
              this.prevSrc = this.props.videoUrls[currentModule - 1].Topic[
                this.props.videoUrls[currentModule - 1].Topic.length - 2
              ].src;
            } else {
              this.prevSrc = this.props.videoUrls[currentModule - 1].Topic[
                this.props.videoUrls[currentModule - 1].Topic.length - 1
              ].src;
            }
          }

          if (this.props.videoUrls[currentModule].Topic[currentLesson + 1]) {
            if (
              this.props.videoUrls[currentModule].Topic[currentLesson + 1]
                .type === "quiz"
            ) {
              this.forwardLessonText = "Start Sub Quiz";
              this.quizName = this.props.videoUrls[currentModule].Topic[
                currentLesson + 1
              ].name;
            } else {
              this.nextSrc = this.props.videoUrls[currentModule].Topic[
                currentLesson + 1
              ].src;
              this.forwardLessonText = "Next Lesson";
            }
          } else if (this.props.videoUrls[currentModule + 1].Topic[0]) {
            this.nextSrc = this.props.videoUrls[currentModule + 1].Topic[0].src;
            this.forwardLessonText = "Next Module";
          }
        }
      }
    }

    if (this.forwardLessonText === "") {
      return (
        <button className="button" onClick={this.movePrev}>
          {backLessonText}
        </button>
      );
    } else if (backLessonText === "") {
      return (
        <button className="button" onClick={this.moveNext}>
          {this.forwardLessonText}
        </button>
      );
    } else {
      return (
        <div>
          <button className="button" onClick={this.movePrev}>
            {backLessonText}
          </button>
          <button className="button" onClick={this.moveNext}>
            {this.forwardLessonText}
          </button>
        </div>
      );
    }
  };

  movePrev = () => {
    let currSrc = { ...this.state.currSrc };
    currSrc = this.prevSrc;
    this.setState({ currSrc });
  };

  moveNext = () => {
    if (this.forwardLessonText === "Start Sub Quiz") {
      let isQuiz = { ...this.state.isQuiz };
      isQuiz = !this.state.isQuiz;
      this.setState({ isQuiz });
    } else {
      let currSrc = { ...this.state.currSrc };
      currSrc = this.nextSrc;
      this.setState({ currSrc });
    }
  };
}

export default VideoTutorial;
