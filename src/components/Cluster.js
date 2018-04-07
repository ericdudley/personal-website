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
            this.rad = 0;
            this.spd = 0;
            this.clr = 0;
        }

        update() {
            this.pos.add(this.vel);
        }

        get modpos() {
            let x = this.pos.x;
            let y = this.pos.y;

            if (x < 0) {
                x = p.width - (Math.abs(x) % p.width);
            } else {
                x = Math.abs(x) % p.width;
            }

            if (y < 0) {
                y = p.height - (Math.abs(y) % p.height);
            } else {
                y = Math.abs(y) % p.height;
            }

            x -= p.width / 2;
            y -= p.height / 2;

            return p.createVector(x, y);
        }

        render() {
            p.ellipse(this.modpos.x, this.modpos.y, this.rad, this.rad);
        }
    }


    const dots = [];
    const DOTS_COUNT = 30;
    const BACKGROUND_COLOR = 0;
    const CLUSTER_DIST = 150;
    p.setup = function () {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);

        for (let i = 0; i < DOTS_COUNT; i++) {
            const dot = new Dot();
            dot.pos.x = p.random(-p.width, 0);
            dot.pos.y = p.random(-p.height, 0);
            dot.spd = p.random(4, 7);
            dot.clr = 255;
            dot.rad = 5;

            let angle = p.random(0, p.PI * 2);
            dot.vel.x = p.cos(angle) * dot.spd;
            dot.vel.y = p.sin(angle) * dot.spd;

            dots.push(dot);
        }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        if (props.rotation) {
            rotation = props.rotation * Math.PI / 180;
        }
    };

    p.draw = function () {
        p.background(BACKGROUND_COLOR);
        p.rotateY(rotation);
        for (const dot of dots) {
            p.push();
            p.fill(dot.clr);
            dot.update();
            dot.render();
            p.pop();

            for (const other of dots) {
                if (dot !== other && dot.modpos.dist(other.modpos) < CLUSTER_DIST) {
                    p.push();
                    p.stroke(dot.clr);
                    p.line(dot.modpos.x, dot.modpos.y, other.modpos.x, other.modpos.y);
                    p.pop();
                }
            }
        }
    };
};