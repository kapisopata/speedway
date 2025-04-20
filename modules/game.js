// game.js
import { initCanvas, initImage, initGameState, initListeners } from './init.js';
import { drawBackground } from './board.js';
import { trail_max_length } from './config.js';

export default class Game {
    constructor() {
        const { canvas, ctx } = initCanvas();
        this.canvas = canvas;
        this.ctx = ctx;
        this.image = initImage();
        this.state = initGameState();
        this.state.trail = [];
        initListeners(this);
        // console.log("Game initialized", this.state);
        // console.log("initialized", initListeners(this));
    }

    startGame() {
        this.state.isGameRunning = true;
        this.state.interval = setInterval(() => {
            this.update();
            this.draw();
        }, 10);
    }

    update() {
        if (this.state.keys["a"]) {
            this.state.angle -= 0.03;
        }
        this.state.x += Math.cos(this.state.angle) * this.state.speed;
        this.state.y += Math.sin(this.state.angle) * this.state.speed;
    }

    draw() {
        this.ctx.clearRect(this.state.x - 15, this.state.y - 15, 30, 30);
        drawBackground(this.ctx);

        this.state.trail.push({ x: this.state.x, y: this.state.y });
        if (this.state.trail.length > trail_max_length) {
            this.state.trail.shift();
        }

        if (this.state.trail.length > 1) {
            for (let i = 1; i < this.state.trail.length; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.state.trail[i - 1].x, this.state.trail[i - 1].y);
                this.ctx.lineTo(this.state.trail[i].x, this.state.trail[i].y);

                const gradient = this.ctx.createLinearGradient(
                    this.state.trail[i - 1].x,
                    this.state.trail[i - 1].y,
                    this.state.trail[i].x,
                    this.state.trail[i].y
                );

                const opacity = i / this.state.trail.length;
                gradient.addColorStop(0, `rgba(255, 0, 0, ${opacity})`);
                gradient.addColorStop(1, `rgba(139, 0, 0, ${opacity})`);

                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = 3;
                this.ctx.stroke();
            }
        }

        this.ctx.save();
        this.ctx.translate(this.state.x, this.state.y);
        this.ctx.rotate(this.state.angle + Math.PI);
        this.ctx.drawImage(this.image, -15, -15, 30, 30);
        this.ctx.restore();
    }
}