import React, { Component } from "react";
import { Player, ControlBar } from "video-react";
const sources = {
  sintelTrailer: "http://media.w3.org/2010/05/sintel/trailer.mp4",
  bunnyTrailer: "http://media.w3.org/2010/05/bunny/trailer.mp4",
  bunnyMovie: "http://media.w3.org/2010/05/bunny/movie.mp4",
  test: "http://media.w3.org/2010/05/video/movie_300.webm"
};
class TutorialVideos extends Component {
  state = {
    currentSrc: "http://media.w3.org/2010/05/bunny/movie.mp4",
    duration: 596.48,
    currentTime: 7.80875,
    seekingTime: 0,
    buffered: {},
    waiting: false,
    seeking: false,
    paused: true,
    autoPaused: false,
    ended: false,
    playbackRate: 1,
    muted: false,
    volume: 1,
    readyState: 4,
    networkState: 1,
    videoWidth: 854,
    videoHeight: 480,
    hasStarted: true,
    userActivity: false,
    isActive: false,
    isFullscreen: false,
    activeTextTrack: null,
    error: null,
    src: "",
    srcObject: null,
    crossOrigin: null,
    preload: "auto",
    defaultPlaybackRate: 1,
    played: {},
    seekable: {},
    autoplay: true,
    loop: false,
    controls: false,
    defaultMuted: false,
    textTracks: {},
    width: 0,
    height: 0,
    poster: ""
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.bunnyMovie
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  setMuted(muted) {
    return () => {
      this.player.muted = muted;
    };
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  load() {
    this.player.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.player.getState();
      this.player.seek(player.currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.player.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.playbackRate = player.playbackRate + steps;
    };
  }

  changeVolume(steps) {
    return () => {
      const { player } = this.player.getState();
      this.player.volume = player.volume + steps;
    };
  }

  changeSource(name) {
    return () => {
      this.setState({
        source: sources[name]
      });
      this.player.load();
    };
  }

  render() {
    return (
      <div>
        <Player
          ref={player => {
            this.player = player;
          }}
          autoPlay
        >
          <source src={this.state.source} />
          <ControlBar autoHide={false} />
        </Player>
        <div className="py-3">
          <button onClick={this.play} className="mr-3">
            play()
          </button>
          <button onClick={this.pause} className="mr-3">
            pause()
          </button>
          <button onClick={this.load} className="mr-3">
            load()
          </button>
        </div>
        <div className="pb-3">
          <button onClick={this.changeCurrentTime(10)} className="mr-3">
            currentTime += 10
          </button>
          <button onClick={this.changeCurrentTime(-10)} className="mr-3">
            currentTime -= 10
          </button>
          <button onClick={this.seek(50)} className="mr-3">
            currentTime = 50
          </button>
        </div>
        <div className="pb-3">
          <button onClick={this.changePlaybackRateRate(1)} className="mr-3">
            playbackRate++
          </button>
          <button onClick={this.changePlaybackRateRate(-1)} className="mr-3">
            playbackRate--
          </button>
          <button onClick={this.changePlaybackRateRate(0.1)} className="mr-3">
            playbackRate+=0.1
          </button>
          <button onClick={this.changePlaybackRateRate(-0.1)} className="mr-3">
            playbackRate-=0.1
          </button>
        </div>
        <div className="pb-3">
          <button onClick={this.changeVolume(0.1)} className="mr-3">
            volume+=0.1
          </button>
          <button onClick={this.changeVolume(-0.1)} className="mr-3">
            volume-=0.1
          </button>
          <button onClick={this.setMuted(true)} className="mr-3">
            muted=true
          </button>
          <button onClick={this.setMuted(false)} className="mr-3">
            muted=false
          </button>
        </div>
        <div className="pb-3">
          <button onClick={this.changeSource("sintelTrailer")} className="mr-3">
            Sintel teaser
          </button>
          <button onClick={this.changeSource("bunnyTrailer")} className="mr-3">
            Bunny trailer
          </button>
          <button onClick={this.changeSource("bunnyMovie")} className="mr-3">
            Bunny movie
          </button>
          <button onClick={this.changeSource("test")} className="mr-3">
            Test movie
          </button>
        </div>
        <div>State</div>
        <pre>
          {/* <PrismCode className="language-json">
            {JSON.stringify(this.state.player, null, 2)}
          </PrismCode> */}
        </pre>
      </div>
    );
  }
}

export default TutorialVideos;
