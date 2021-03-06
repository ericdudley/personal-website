import React from "react";
import { Link } from "react-router";
import Navigation from "./Navigation";
import Clock from "react-live-clock";
import NumberPicker from "react-number-picker";
import "../styles/stretch.scss";
import "../styles/picker.scss";
import localStorage from "local-storage";
import meSpeak from "mespeak";
import good_job_01 from "../sounds/good_job_01.mp3";
import good_job_02 from "../sounds/good_job_02.mp3";
import cheer from "../sounds/cheer.mp3";
import cable from "../sounds/cable.mp3";

meSpeak.loadVoice(require("mespeak/voices/en/en-us.json"));
meSpeak.loadConfig(require("mespeak/src/mespeak_config.json"));

function speak(text, options) {
  if (!meSpeak.isConfigLoaded()) {
    console.error("meSpeak not configured");
    return;
  }
  if (!meSpeak.isVoiceLoaded("en/en-us")) {
    console.error("meSpeak voice not loaded");
    return;
  }
  meSpeak.speak(
    text,
    undefined,
    options && options.onend ? options.onend : undefined
  );
}

class Stretch extends React.Component {
  constructor(props) {
    super(props);
    this.INBETWEENREPSTIME = 7;
    this.INBETWEENSTRETCHESTIME = 15;
    this.INCREMENTTIME = 1000;
    this.lastIncrementTime = 0;
    this.state = {
      numStretches: 3, // 3
      numReps: 5, // 5
      repInterval: 30, // 30
      currStretch: 1,
      currRep: 1,
      currTime: 0,
      currLeg: "R",
      started: false,
      paused: false,
      pauseTime: this.INBETWEENSTRETCHESTIME,
    };

    this.encouragements = [
      "nice work!",
      "keep going!",
      "great form!",
      "you're doing great!",
      "hashtag best stretcher",
      "hashtag stretcher of the year",
      "don't forget to smile",
      "you look great",
      "you can do it",
      "never give up",
      "stay focused",
      "stretch it out",
      "fx dark christmas is my favorite movie",
      "play Dizzy Gillespie",
      "you don't need two monitors",
    ];

    this.audioIds = [
      ["good_job_01", 0.75],
      ["good_job_02", 0.8],
      ["cheer", 0.5],
      ["cable", 0.75],
    ];
  }

  componentDidMount() {
    this.reset();
    this.state = {
      numStretches: parseInt(localStorage.get("numStretches")) || 3, // 3
      numReps: parseInt(localStorage.get("numReps")) || 5, // 5
      repInterval: parseInt(localStorage.get("repInterval")) || 30, // 30
    };
  }

  reset() {
    this.setState({
      currStretch: 1,
      currRep: 1,
      currTime: 0,
      currLeg: "R",
      started: false,
      paused: false,
      pauseTime: this.INBETWEENSTRETCHESTIME,
    });
  }

  increment() {
    const now = performance.now();
    if (now - this.lastIncrementTime > this.INCREMENTTIME) {
      this.lastIncrementTime = now;
      if (!this.state.started) {
        speak("session stopped");
        this.reset();
        return;
      } else if (!this.state.paused) {
        let nextTime = this.state.currTime + 1;
        let nextStretch = this.state.currStretch;
        let nextRep = this.state.currRep;
        let nextLeg = this.state.currLeg;
        let nextPauseTime = this.state.pauseTime;
        let speech = "";
        if (nextTime == 0) {
          speech = "begin stretching";
          if (nextRep == this.state.numReps && nextLeg == "L") {
            speech += "; this is the last one";
          }
        }
        if (nextTime >= this.state.repInterval) {
          nextTime = -this.INBETWEENREPSTIME;
          nextPauseTime = this.INBETWEENREPSTIME;
          nextLeg = nextLeg === "L" ? "R" : "L";
          if (nextLeg === "R") {
            speech = "stop; rep number " + this.state.currRep + " completed";
            nextRep++;
          } else {
            speech = "stop; switch sides";
          }
          if (nextLeg === "R" && nextRep > this.state.numReps) {
            nextRep = 1;
            nextStretch++;
            if (nextStretch > this.state.numStretches) {
              speak("session completed");
              this.reset();
              return;
            } else {
              nextTime = -this.INBETWEENSTRETCHESTIME;
              nextPauseTime = this.INBETWEENSTRETCHESTIME;
              speech =
                "stop; stretch number" +
                this.state.currStretch.toString() +
                "completed; beginning stretch " +
                nextStretch.toString() +
                " in " +
                this.INBETWEENSTRETCHESTIME.toString() +
                " seconds";
            }
          }
        }
        if (speech !== "") {
          if (Math.random() < 0.05) {
            if (Math.random() > 0.6) {
              speech +=
                "; " +
                this.encouragements[
                  Math.floor(Math.random() * this.encouragements.length)
                ];
            } else {
              const chosen = this.audioIds[
                Math.floor(Math.random() * this.audioIds.length)
              ];
              const audioElement = document.getElementById(chosen[0]);
              if (audioElement) {
                audioElement.volume = chosen[1];
                audioElement.play();
              }
            }
          }
          speak(speech);
        }
        this.setState({
          currStretch: nextStretch,
          currRep: nextRep,
          currTime: nextTime,
          currLeg: nextLeg,
          pauseTime: nextPauseTime,
        });
      }
    }
    requestAnimationFrame(this.increment.bind(this));
  }

  clicked1() {
    if (!this.state.started) {
      let self = this;
      self.setState({
        started: true,
        paused: false,
      });
      speak("starting session in " + this.INBETWEENSTRETCHESTIME + " seconds", {
        onend: function () {
          self.setState(
            {
              currTime: -self.INBETWEENSTRETCHESTIME,
            },
            self.increment.bind(self)
          );
        },
      });
    } else {
      this.setState({
        started: false,
      });
    }
  }

  clicked2() {
    if (!this.state.started) {
      this.reset();
    } else {
      if (this.state.paused) {
        speak("session resumed");
        this.setState({
          paused: false,
        });
      } else {
        speak("session paused");
        this.setState({
          paused: true,
        });
      }
    }
  }

  updatenumStretches(new_value) {
    localStorage.set("numStretches", new_value);
    this.setState({ numStretches: new_value });
  }

  updatenumReps(new_value) {
    localStorage.set("numReps", new_value);
    this.setState({ numReps: new_value });
  }

  updaterepInterval(new_value) {
    localStorage.set("repInterval", new_value);
    this.setState({ repInterval: new_value });
  }

  render() {
    let button2 = this.state.started ? (
      <a className="btn" onClick={this.clicked2.bind(this)}>
        {!this.state.started ? "reset" : this.state.paused ? "resume" : "pause"}
      </a>
    ) : null;

    let progress_bar_wrapper = this.state.started ? (
      <div className="progressbar-wrapper">
        <div
          style={{
            width:
              (100 *
                (this.state.currTime > 0
                  ? this.state.currTime
                  : -this.state.currTime)) /
                (this.state.currTime < 0
                  ? this.state.pauseTime
                  : this.state.repInterval) +
              "%",
          }}
        >
          <span className="progressbar-time">
            {this.state.currTime > 0 &&
            this.state.currTime >= this.state.repInterval * 0.5
              ? this.state.repInterval - this.state.currTime
              : ""}
          </span>
        </div>
      </div>
    ) : null;

    let status_wrapper = this.state.started ? (
      <div className="status-wrapper">
        <p>
          set <span className="curr-stretch">{this.state.currStretch}</span>
        </p>
        <p>
          rep <span className="curr-rep">{this.state.currRep}</span>
        </p>
        <p>
          side <span className="curr-leg">{this.state.currLeg}</span>
        </p>
        <p>
          time{" "}
          <span className="curr-time">{Math.abs(this.state.currTime)}</span>
        </p>
      </div>
    ) : null;

    let num_selectors = !this.state.started ? (
      <div className="control-num-selectors-wrapper">
        <div className="num-selector-wrapper">
          <span>stretches</span>
          <NumberPicker
            value={this.state.numStretches}
            onChange={this.updatenumStretches.bind(this)}
            digits={2}
          />
        </div>
        <div className="num-selector-wrapper">
          <span>reps</span>
          <NumberPicker
            value={this.state.numReps}
            onChange={this.updatenumReps.bind(this)}
            digits={2}
          />
        </div>
        <div className="num-selector-wrapper">
          <span>interval</span>
          <NumberPicker
            value={this.state.repInterval}
            onChange={this.updaterepInterval.bind(this)}
            digits={2}
          />
        </div>
      </div>
    ) : null;

    let calculate_seconds = function (stretches, reps) {
      return (
        stretches * this.INBETWEENSTRETCHESTIME +
        stretches * (reps * 2 - 1) * this.INBETWEENREPSTIME +
        stretches * reps * 2 * this.state.repInterval
      );
    };
    let total_seconds = calculate_seconds.bind(this)(
      this.state.numStretches,
      this.state.numReps
    );
    let total_minutes = Math.round(total_seconds / 60);
    let remaining_seconds =
      total_seconds -
      calculate_seconds.bind(this)(this.state.currStretch, this.state.numReps) +
      (this.state.numReps - this.state.currRep) * 2 * this.state.repInterval;
    let remaining_minutes = Math.round(remaining_seconds / 60);
    let total_time = this.state.started ? (
      <div className="total-time-wrapper">
        <p>
          <span className="total-time-title"></span>
          <span className="total-time-number"> {remaining_minutes} </span>
          <span className="total-time-title">minutes remaining</span>
        </p>
      </div>
    ) : (
      <div className="total-time-wrapper">
        <p>
          <span className="total-time-title">session length</span>
          <span className="total-time-number"> {total_minutes} </span>
          <span className="total-time-title">minutes</span>
        </p>
      </div>
    );
    return (
      <div id="stretch" className={!this.state.started ? "not-active" : ""}>
        <audio id="good_job_01" src={good_job_01} />
        <audio id="good_job_02" src={good_job_02} />
        <audio id="cheer" src={cheer} />
        <audio id="cable" src={cable} />
        <div></div>
        <Navigation />
        {progress_bar_wrapper}
        {status_wrapper}
        <div className="control-buttons-wrapper">
          <a className="btn" onClick={this.clicked1.bind(this)}>
            {!this.state.started ? "start" : "stop"}
          </a>
          {button2}
        </div>
        {num_selectors}
        {total_time}
        <div className="live-clock">
          <Clock format={"hh:mm:ss A"} ticking={true} />
        </div>
        <Link to={`/`} className="link back-link">
          <i className="fa fa-arrow-left" /> back
        </Link>
      </div>
    );
  }
}

export default Stretch;
