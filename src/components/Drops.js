import React from "react";
import '../styles/drops.scss';

class Drops extends React.Component {

    constructor() {
        super();
        this.min_drop_speed = 20;
        this.drop_speed_variance = 3;
        this.delay_time = 30;
        this.drop_density_width = 100; // in px
        this.drop_density = 1;
        this.min_drop_size = 0.25 * (this.drop_density_width / this.drop_density);        
        this.drop_size_variance = this.min_drop_size;
        this.initial_drops = 30; // deprecated
        this.gravity_direction = 0;
        this.angle_wiggle = 0;
        this.drop_red = 0;
        this.drop_green = 0;
        this.drop_blue = 0;
        this.frames = 0;
        this.transition_frame = 60;
        this.transition_time = 250;
        this.panel_height = 10;
    }

    componentDidMount() {
        let self = this;
        window.addEventListener("resize", function(){
            self.updateDrops(self);
        });
        this.drops = [];
        this.ctx = this.refs.drops_canvas.getContext('2d');
        this.updateDrops(this);
        this.updateCanvas(this);
    }
    
    updateDrops(self){
        self.ctx.canvas.width = window.innerWidth;
        self.ctx.canvas.height = window.innerHeight;
        self.initial_drops = Math.round(self.drop_density * (self.ctx.canvas.width / self.drop_density_width));
        self.drops = [];
        let win_gap = (self.ctx.canvas.width / self.initial_drops);
        for (let i = 0; i < self.initial_drops; i++) {             
            self.drops.push(self.createDrop(window.innerHeight));
            self.drops[i].x = win_gap * i;
        }
    }
    
    updateCanvas(self) {
        self.draw_interval = setInterval(function () {
            self.frames++;
            if(self.frames > self.transition_frame){
                self.ctx.fillStyle = '#000';
                self.ctx.fillRect(0, self.panel_height, self.ctx.canvas.width, self.ctx.canvas.height - 3*self.panel_height);
            }
            for (let drop of self.drops) {
                if(self.frames < self.transition_frame){
                let clrstr = 'rgb(' + self.drop_red + ',' + self.drop_green + ',' + self.drop_blue + ')';
                self.ctx.fillStyle = clrstr;
                self.ctx.fillRect(drop.x - drop.r, drop.y - drop.r, drop.r*8, drop.r*8);
                } else{
                    self.ctx.fillStyle = 'rgba(22, 255, 255, 1)';
                    let lsize = 15 * (drop.r / (self.min_drop_size + self.drop_size_variance));
                    self.ctx.fillRect(drop.x - lsize/2, drop.y + drop.s*0.9, lsize, lsize);
                }
            }
            for (let drop of self.drops) {
                if (drop.y > self.ctx.canvas.height + drop.r) {
                    self.drops[self.drops.indexOf(drop)] = self.createDrop(4*(self.min_drop_size + self.drop_size_variance));
                } else {
                    drop.y += drop.s;
                    drop.d = (drop.d + self.gravity_direction) / 2;
                    drop.d += (Math.random() > 0.5 ? 1 : -1 ) * Math.random() * self.angle_wiggle;
                }
            }

            if(self.frames > self.transition_frame){                
                self.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                self.ctx.fillRect(0, 0, self.ctx.canvas.width, self.panel_height);
                self.ctx.fillRect(0, self.ctx.canvas.height - 3*self.panel_height, self.ctx.canvas.width, 3*self.panel_height);
            }
            if(self.frames < self.transition_frame + self.transition_time && self.frames >= self.transition_frame){
                let anim_rat = 1 - ((self.frames - self.transition_frame) / self.transition_time);
                self.ctx.fillStyle = 'rgba(0,0,0,'+anim_rat+')';
                self.ctx.fillRect(0, 0, self.ctx.canvas.width, self.ctx.canvas.height); 
            }
        }, this.delay_time);
    }
    createDrop(soff) {
        let ndrop = {
            x: Math.random() * this.ctx.canvas.width,
            y: Math.random() * -soff + -this.min_drop_size,
            r: Math.random() * this.drop_size_variance + this.min_drop_size,
            s: 10,
            d: 0
        };
        ndrop.s = (ndrop.r / this.min_drop_size) * this.drop_speed_variance + this.min_drop_speed;
        return ndrop;
    }
    render() {
        return (
            <div id="drops">
                <canvas ref="drops_canvas" />
            </div>
        );
    }
}

export default Drops;