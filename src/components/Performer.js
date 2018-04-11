import React from "react";
import { Link } from "react-router";
import Navigation from "./Navigation";
import "../styles/performer.scss";
// import "../images/tiger.mp4";
import { SliderPicker, CirclePicker } from 'react-color';
import Visualizer from './Visualizer';
// import "../sounds/jazzy.mp3";
class Performer extends React.Component {
    componentDidMount() {
        let self = this;
        self.initframe = null;
        self.sr = 0;
        self.sg = 0;
        self.sb = 0;
        self.tolerance = 50;
        let v = document.getElementById('video');
        v.playbackRate = 1.08;
        let canvas = document.getElementById('vcanvas1');
        let context = canvas.getContext('2d');

        canvas.width = v.width;
        canvas.height = v.height;

        if (window.innerWidth >= 768) {
            self.resetColor();
            v.addEventListener('play', function () {
                self.draw(this, context, canvas.width, canvas.height);
            }, false);
        }
    }

    draw(v, c, w, h) {
        let self = this;
        if (v.paused || v.ended) return false;
        c.drawImage(v, 0, 0, w, h);
        if (self.initframe == null) {
            self.initframe = c.getImageData(0, 0, w, h).data;
        }
        let idata = c.getImageData(0, 0, w, h);
        let data = idata.data;
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            // let ir = self.initframe[i];
            // let ig = self.initframe[i+1];
            // let ib = self.initframe[i+2];
            // let pr = self.prevframe[i];
            // let pg = self.prevframe[i+1];
            // let pb = self.prevframe[i+2];
            let brightness = (3 * r + 4 * g + b) >>> 3;
            // let ibrightness = (3*ir+4*ig+ib)>>>3;
            // let pbrightness = (3*pr+4*pg+pb)>>>3;
            if ((data[i] <= self.sr + self.tolerance && data[i] >= self.sr - self.tolerance && data[i + 1] <= self.sg + self.tolerance && data[i + 1] >= self.sg - self.tolerance && data[i + 2] <= self.sb + self.tolerance && data[i + 2] >= self.sb - self.tolerance)) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
                data[i + 3] = 0;
            }
            if (self.tolerance < 100) {
                self.tolerance += 0.001;
            }
        }
        idata.data.set(data);
        c.putImageData(idata, 0, 0);
        self.prevframe = data;
        setTimeout(function () { self.draw(v, c, w, h); }, 30);
    }

    colorChange(color) {
        this.sr = color.rgb.r;
        this.sg = color.rgb.g;
        this.sb = color.rgb.b;
    }

    resetColor() {
        this.sr = 0;
        this.sg = 255;
        this.sb = 0;
    }

    render() {
        return (<div id="performer">
            <Navigation />
            <h1 className="no-mobile">Not currently supported on mobile!</h1>
            <SliderPicker onChange={this.colorChange.bind(this)} color="rgb(0,255,0)" />
            <div className="green-screen" onClick={this.resetColor.bind(this)} />
            <video id="video" width="480" height="270" autoPlay loop muted>
                <source src="tiger.mp4" type="video/mp4" />
            </video>
            <br />
            <canvas width="480" height="270" id="vcanvas1" />
            <br />
            <Visualizer
                model={
                    {
                        path: 'jazzy.mp3',
                        author: 'Ben Sound',
                        title: 'Jazzy'
                    }
                }
                options={
                    {
                        autoplay: window.innerWidth >= 768
                    }
                }
                width="480px"
                height="400px"
            />
            <Link to={`/`} className="link back-link">
                <i className="fa fa-arrow-left" /> back
            </Link>
        </div>);
    }
}

export default Performer;
