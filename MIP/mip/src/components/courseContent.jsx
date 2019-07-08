import React, { Component } from "react";
import CollapsibleCards from "./collapsibleCards";
import VideoTutorial from "./videoTutorial";
import SubQuiz from "./subQuiz";

class CourseContent extends Component {
  state = {
    redirect: "",
    currentVideo: "",
    videos: [
      {
        Topic: [
          {
            module: "Module 1",
            name: "Video1",
            src: "http://techslides.com/demos/sample-videos/small.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          },
          {
            module: "Module 1",
            name: "Video2",
            src:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          },
          {
            module: "Module 1",
            name: "Video3",
            src:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          }
        ]
      },
      {
        Topic: [
          {
            module: "Module 2",
            name: "Video8",
            src:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          },
          {
            module: "Module 2",
            name: "Video9",
            src:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          },
          {
            module: "Module 2",
            name: "Video10",
            src:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          },
          {
            module: "Module 2",
            name: "quiz1",
            score: 0,
            completed: false,
            type: "quiz"
          }
        ]
      },
      {
        Topic: [
          {
            module: "Module 3",
            name: "Video4",
            src: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          },
          {
            module: "Module 3",
            name: "Video5",
            src:
              "http://media.w3.org/2010/04/html5-meetup-paris-avril-2010.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          },
          {
            module: "Module 3",
            name: "Video6",
            src: "http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          },
          {
            module: "Module 3",
            name: "Video7",
            src:
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            currentTime: 0,
            completed: false,
            type: "course"
          },
          {
            module: "Module 1",
            name: "quiz2",
            score: 0,
            completed: false,
            type: "quiz"
          }
        ]
      }
    ]
  };

  render() {
    if (this.state.redirect === "course") {
      return (
        <div>
          <VideoTutorial
            videoSource={this.state.currentVideo}
            onGoToCourseContent={this.handleGoToCourseContent}
            videoUrls={this.state.videos}
            onGoToCourseContentFromQuiz={this.handleGoToCourseContentFromQuiz}
          />
        </div>
      );
    } else if (this.state.redirect === "quiz") {
      return (
        <div>
          <SubQuiz />
        </div>
      );
    } else {
      return (
        <div>
          <ul>
            {this.state.videos.map(topicValue => (
              <li key={topicValue.Topic}>
                <CollapsibleCards
                  cardContent={topicValue}
                  onCourseRedirect={this.handleCourseRedirect}
                />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

  handleGoToCourseContent = obj => {
    let videos = [...this.state.videos];
    for (var key = 0; key < this.state.videos.length; key++) {
      for (
        var value = 0;
        value < this.state.videos[key].Topic.length;
        value++
      ) {
        if (obj.type === "course") {
          if (
            this.state.videos[key].Topic[value].type === "course" &&
            this.state.videos[key].Topic[value].src === obj.value.currentSrc
          ) {
            videos[key].Topic[value].currentTime = obj.value.currentTime;
            if (obj.value.currentTime >= obj.value.duration) {
              videos[key].Topic[value].completed = true;
            }
          }
        } else if (obj.type === "quiz") {
          if (
            this.state.videos[key].Topic[value].type === "quiz" &&
            this.state.videos[key].Topic[value].name === obj.quizName
          ) {
            videos[key].Topic[value].completed = true;
          }
        }
      }
    }
    this.setState({ videos });
    let redirect = { ...this.state.redirect };
    redirect = "";
    this.setState({ redirect });
  };

  handleCourseRedirect = urlValue => {
    let redirect = { ...this.state.redirect };
    redirect = urlValue.type;
    let currentVideo = { ...this.state.currentVideo };
    currentVideo = urlValue.src;
    this.setState({ currentVideo });
    this.setState({ redirect });
  };
}

export default CourseContent;
