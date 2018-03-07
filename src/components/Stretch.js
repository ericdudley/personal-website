import React from "react";
import { Link } from "react-router";
import Navigation from "./Navigation";
import NumberPicker from "react-number-picker";
import "../styles/stretch.scss";
import "../styles/picker.scss";
import { clearInterval } from "timers";
import ResponsiveVoice from "./responsivevoice";
import { withCookies, Cookies } from 'react-cookie';
let responsiveVoice = new ResponsiveVoice().responsiveVoice;
class Stretch extends React.Component{

    constructor(props) {
        super(props);
        this.INBETWEENREPSTIME = 7;
        this.INBETWEENSTRETCHESTIME = 15;
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
            search_query: ""
        };
        
        this.encouragements = [
            "nice work!",
            "keep going!",
            "great form!",
            "you're doing great!",
            "hashtag best stretcher",
            "hashtag stretcher of the year",
            "you'll miss this",
            "this too shall pass",
            "don't forget to smile",
            "you look great",
            "you can do it",
            "never give up"
        ];
	}
    
    componentDidMount(){
        responsiveVoice.setDefaultVoice("US English Female");
        this.reset();
        const { cookies } = this.props;        
        this.state = {
            numStretches: parseInt(cookies.get('numStretches')) || 3, // 3
            numReps: parseInt(cookies.get('numReps')) || 5, // 5
            repInterval: parseInt(cookies.get('repInterval')) || 30, // 30
            search_query: cookies.get('search_query')
        };               
    }

    reset(){
        this.setState({
            currStretch: 1,
            currRep: 1,
            currTime: 0,
            currLeg: "R",
            started: false,
            paused: false,
            pauseTime: this.INBETWEENSTRETCHESTIME
        });
    }

    increment(){
        if(!this.state.started){
            responsiveVoice.speak("session stopped");
            this.reset();
            return;
        }
        else if(!this.state.paused){
            let nextTime = this.state.currTime + 1;
            let nextStretch = this.state.currStretch;
            let nextRep = this.state.currRep;
            let nextLeg = this.state.currLeg;
            let nextPauseTime = this.state.pauseTime;
            let speech = "";
            if(nextTime == 0){
                speech = "begin stretching";
                if(nextRep == this.state.numReps && nextLeg == "L"){
                    speech += "; this is the last one";
                }
            }
            if(nextTime >= this.state.repInterval){
                nextTime = -this.INBETWEENREPSTIME;
                nextPauseTime = this.INBETWEENREPSTIME;
                nextLeg = nextLeg === "L" ? "R" : "L";
                if(nextLeg === "R"){
                    speech = "stop; rep completed";
                    nextRep++;
                } else{
                    speech = "stop; switch sides";
                }
                if(nextLeg === "R" && nextRep > this.state.numReps){
                    nextRep = 1;
                    nextStretch++;
                    if(nextStretch > this.state.numStretches){
                        responsiveVoice.speak("session completed");
                        this.reset();
                        return;
                    } else{
                        nextTime = -this.INBETWEENSTRETCHESTIME;
                        nextPauseTime = this.INBETWEENSTRETCHESTIME;
                        speech = "stop; stretch number" + this.state.currStretch.toString() + "completed; beginning stretch "+nextStretch.toString()+" in "+this.INBETWEENSTRETCHESTIME.toString()+" seconds";
                    }
                }
            }
            if(speech !== ""){
                if(Math.random() < 0.05){
                    speech += "; "+this.encouragements[
                            Math.floor(Math.random()*this.encouragements.length)
                        ];
                }
                responsiveVoice.speak(speech);
            }
            this.setState({
                currStretch: nextStretch,
                currRep: nextRep,
                currTime: nextTime,
                currLeg: nextLeg,
                pauseTime: nextPauseTime
            });
        }
        setTimeout(this.increment.bind(this), 1000);
    }

    clicked1(){
        if(!this.state.started){
            let self = this;
            responsiveVoice.speak("starting session in "+this.INBETWEENSTRETCHESTIME+" seconds", "US English Female", {
                onstart: function(){
                    self.setState({
                        started: true,
                        paused: false,
                    });  
                },
                onend: function(){
                self.setState({
                    currTime: -self.INBETWEENSTRETCHESTIME
                },self.increment.bind(self));  
            }});  
        } else{
            this.setState({
                started: false
            });
        }
    }

    clicked2(){
        if(!this.state.started){
            this.reset();
        } else{
            if(this.state.paused){
                responsiveVoice.speak("session resumed");
                this.setState({
                    paused: false
                });
            } else{
                responsiveVoice.speak("session paused");
                this.setState({
                    paused: true
                });
            }
        }
    }

    search(){
        let url_search_query = this.state.search_query.split().join("+")
        window.open(encodeURI("https://www.youtube.com/results?search_query="+url_search_query), "_blank");
    }

    searchPress(e){
        if (e.key === 'Enter') {
          this.search();
        }
      }

    updateSearch({ target }) {
        const { cookies } = this.props;
        cookies.set('search_query', target.value, {
            maxAge: 31536000
        });
        this.setState({
          search_query: target.value
        });
    }
    

    updatenumStretches(new_value) {
        const { cookies } = this.props;
        cookies.set('numStretches', new_value, {
            maxAge: 31536000
        });
		this.setState({numStretches: new_value});
    }

    updatenumReps(new_value) {
        const { cookies } = this.props;
        cookies.set('numReps', new_value, {
            maxAge: 31536000
        });       
		this.setState({numReps: new_value});
    }

    updaterepInterval(new_value) {
        const { cookies } = this.props;
        cookies.set('repInterval', new_value, {
            maxAge: 31536000
        });
		this.setState({repInterval: new_value});
    }

    render(){
        let button2 = this.state.started ? <a className="btn" onClick={this.clicked2.bind(this)}>{
            (!this.state.started) ? "reset" : 
            (this.state.paused) ? "resume" : "pause"
            }</a> : null;

        let progress_bar_wrapper = this.state.started ?
        <div className="progressbar-wrapper">
            <div style={{width: (100*(this.state.currTime > 0 ? this.state.currTime : -this.state.currTime)/ (this.state.currTime < 0 ? this.state.pauseTime : this.state.repInterval))+"%"}}>
                <span className="progressbar-time">
                    {(this.state.currTime > 0 && this.state.currTime >= this.state.repInterval*0.5) ?this.state.repInterval - this.state.currTime : ""}
                </span>
            </div>
        </div> : null;

        let status_wrapper = this.state.started ?
        <div className="status-wrapper">
            <p>set <span className="curr-stretch">{this.state.currStretch}</span></p>
            <p>rep <span className="curr-rep">{this.state.currRep}</span></p>
            <p>side <span className="curr-leg">{this.state.currLeg}</span></p>
            <p>time <span className="curr-time">{Math.abs(this.state.currTime)}</span></p>
        </div> : null;

        let num_selectors = !this.state.started ?             
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
                <span>interval(seconds)</span> 
                <NumberPicker 
                value={this.state.repInterval}  
                onChange={this.updaterepInterval.bind(this)}
                digits={2}
                />
            </div>
        </div> : null;


        let calculate_seconds = function(stretches, reps){
            return  stretches*this.INBETWEENSTRETCHESTIME +
                    stretches*(reps*2 - 1)*(this.INBETWEENREPSTIME) +
                    stretches*reps*2*this.state.repInterval;
        }
        let total_seconds = calculate_seconds.bind(this)(this.state.numStretches, this.state.numReps);
        let total_minutes = Math.round(total_seconds / 60);
        let remaining_seconds = total_seconds - calculate_seconds.bind(this)(this.state.currStretch, this.state.numReps) +
        (this.state.numReps - this.state.currRep)*2*this.state.repInterval;
        let remaining_minutes = Math.round(remaining_seconds / 60);
        let total_time = this.state.started ?
        <div className="total-time-wrapper">
            <p>
                <span className="total-time-title"></span>
                <span className="total-time-number"> {remaining_minutes} </span>
                <span className="total-time-title">minutes remaining</span>
            </p>
        </div> : 
        <div className="total-time-wrapper">
            <p>
                <span className="total-time-title">session length</span>
                <span className="total-time-number"> {total_minutes} </span>
                <span className="total-time-title">minutes</span>
            </p>
        </div>;
        return (<div id="stretch">
            <h1>stretch</h1>
            {progress_bar_wrapper}
            {status_wrapper}
            <div className="control-buttons-wrapper">
                <a className="btn" onClick={this.clicked1.bind(this)}>{
                    (!this.state.started) ? "start" : "stop"
                }</a>
                {button2}
            </div>
            <div className="youtube-search-wrapper">
                <div className="search-wrapper">
                    <input type="text" placeholder="Music search..."
                    value={this.state.search_query}
                    onChange={this.updateSearch.bind(this)}
                    onKeyPress={this.searchPress.bind(this)}/>
                    <span className="icon" onClick={this.search.bind(this)}><i className="fa fa-search"></i></span>
                </div>
            </div>
            {num_selectors}
            {total_time}
            <Link to={`/`} className="link back-link">
                <i className="fa fa-arrow-left"/> back
            </Link>
        </div>);
    }
}

export default withCookies(Stretch);