import React, { Component } from "react";

import { Player } from "video-react";

class VideoPlayer extends Component {
  state = {
    // videoUrls: {
    //   linkKey1: {
    //     src: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    //     currentTime: 0,
    //     completed: false
    //   },
    //   linkKey2: {
    //     src: "http://media.w3.org/2010/04/html5-meetup-paris-avril-2010.mp4",
    //     currentTime: 0,
    //     completed: false
    //   },
    //   linkKey3: {
    //     src: "http://media.w3.org/2010/07/bunny/04-Death_Becomes_Fur.mp4",
    //     currentTime: 0,
    //     completed: false
    //   }
    // },
    currentVideo: {
      src: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
      currentTime: 0
    },
    slideMenuActive: false
  };

  renderUrls = () => {
    return (
      <div>
        {/* <ul>
          {Object.entries(this.state.videoUrls).map(([urlKey, urlValue]) => (
            <li key={urlKey}>
              <button onClick={() => this.handleVideoChange(urlKey, urlValue)}>
                {urlKey}
              </button>
              <span>{urlValue.completed ? "Completed" : "Not Completed"}</span>
            </li>
          ))}
        </ul> */}
        <Player
          autoPlay
          ref={player => {
            this.player = player;
          }}
          playsInline
          poster="/assets/poster.png"
          currentTime={this.state.currentVideo.currentTime}
          src={this.state.currentVideo.src}
        />
      </div>
    );
  };

  handleVideoChange = (urlKey, urlValue) => {
    let tempVideoObject = { ...this.state.videoUrls };
    for (var key in this.state.videoUrls) {
      if (
        this.state.videoUrls.hasOwnProperty(key) &&
        this.state.videoUrls[key].src ===
          this.player.getState().player.currentSrc
      ) {
        tempVideoObject[
          key
        ].currentTime = this.player.getState().player.currentTime;
        if (
          this.player.getState().player.currentTime >=
          this.player.getState().player.duration
        ) {
          tempVideoObject[key].completed = true;
        }
      }
    }
    this.setState({ videoUrls: tempVideoObject });
    let currentVideo = { ...tempVideoObject[urlKey] };
    this.setState({ currentVideo: tempVideoObject[urlKey] });
  };

  render() {
    return <div>{this.renderUrls()}</div>;
  }

  componentDidMount() {
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }
}

export default VideoPlayer;
