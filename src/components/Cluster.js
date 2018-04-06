import React from "react";
import '../styles/cluster.scss';


export default function clusterSketch(p) {
    window.addEventListener('resize', function () {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    });

    let rotation = 0;

    let Dot = class {
        constructor() {
            this.pos = p.createVector(0, 0);
            this.vel = p.createVector(0, 0);
            this.rad = 20;
        }

        update() {
            this.pos.add(this.vel);
        }

        render() {
            let x = this.pos.x;
            let y = this.pos.y;

            if (x > 0)
                x %= p.width;
            if (y > 0)
                y %= p.height;

            x -= p.width / 2;
            y -= p.height / 2;


            p.ellipse(x, y, this.rad, this.rad);
        }
    }


    p.setup = function () {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        dot.pos.y = p.height / 2;
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        if (props.rotation) {
            rotation = props.rotation * Math.PI / 180;
        }
    };

    const dot = new Dot();
    dot.vel.x = 5;
    dot.vel.y = 3;
    p.draw = function () {
        p.background(255);
        p.rotateY(rotation);
        p.push();
        p.fill(0);
        dot.update();
        dot.render();
        p.pop();
    };
};