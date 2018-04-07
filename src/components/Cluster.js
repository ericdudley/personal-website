import React from "react";
import '../styles/cluster.scss';
import Dot from '../model/Dot';

export default function clusterSketch(p) {
    let rotation = 0;
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        if (props.rotation) {
            rotation = props.rotation * Math.PI / 180;
        }
    };

    let makeDot = function () {
        return new Dot(p);
    }

    let makeDots = function () {
        DOTS_COUNT = p.width * DOTS_DENSITY;
        dots = [];
        for (let i = 0; i < DOTS_COUNT; i++) {
            const dot = makeDot();
            dot.pos.x = p.random(-p.width, 0);
            dot.pos.y = p.random(-p.height, 0);
            dot.spd = p.random(4, 7);
            dot.clr = p.color(22, 255, 255);
            dot.rad = 2;

            let angle = p.random(0, p.PI * 2);
            dot.vel.x = p.cos(angle) * dot.spd;
            dot.vel.y = p.sin(angle) * dot.spd;

            dots.push(dot);
        }
    };

    let mousePos = function () {
        return p.createVector(p.mouseX - p.width / 2, p.mouseY - p.height / 2);
    };

    let dots = [];
    const DOTS_DENSITY = 1.5 / 100;
    let DOTS_COUNT = 0;
    const BACKGROUND_COLOR = 0;
    const CLUSTER_DIST = 200;

    window.addEventListener('resize', function () {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        makeDots();
    });

    p.setup = function () {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        makeDots();
    };

    p.draw = function () {
        p.background(BACKGROUND_COLOR);
        p.rotateY(rotation);
        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            p.push();
            p.fill(dot.clr);
            dot.update();
            dot.render();
            p.pop();

            const dot_modpos = dot.modpos;
            const mouse_pos = mousePos();
            const dist_to_mouse = dot_modpos.dist(mouse_pos);
            if (dist_to_mouse < CLUSTER_DIST) {
                p.push();
                p.stroke(dot.clr);
                p.line(dot_modpos.x, dot_modpos.y, mouse_pos.x, mouse_pos.y);
                p.pop();
            }

            for (let j = i - 1; j >= 0; j--) {
                const other = dots[j];
                const other_modpos = other.modpos;
                if (dot.modpos.dist(other.modpos) < CLUSTER_DIST) {
                    p.push();
                    p.stroke(dot.clr);
                    p.line(dot_modpos.x, dot_modpos.y, other_modpos.x, other_modpos.y);
                    p.pop();
                }
            }
        }
    };
}