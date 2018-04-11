export default class Dot {

    constructor(p) {
        this.p = p;
        this.pos = this.p.createVector(0, 0);
        this.vel = this.p.createVector(0, 0);
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
            x = this.p.width - (Math.abs(x) % this.p.width);
        } else {
            x = Math.abs(x) % this.p.width;
        }

        if (y < 0) {
            y = this.p.height - (Math.abs(y) % this.p.height);
        } else {
            y = Math.abs(y) % this.p.height;
        }

        x -= this.p.width / 2;
        y -= this.p.height / 2;

        return this.p.createVector(x, y);
    }

    render() {
        this.p.ellipse(this.modpos.x, this.modpos.y, this.rad, this.rad);
    }
}