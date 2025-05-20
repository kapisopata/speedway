import { initCanvas, initImage, initGameState, initListeners } from './init.js';
import { drawBackground, isInMiddleArea, isInOuterArea } from './board.js';
import { trail_max_length } from './config.js';

export default class Game {
    constructor(playersConfig) {
        const { canvas, ctx } = initCanvas();
        this.canvas = canvas;
        this.ctx = ctx;
        this.image = initImage();
        this.playersConfig = playersConfig;
        this.state = initGameState(playersConfig);
        initListeners(this);
        // console.log("Game init", this.state);
        // console.log("init", initListeners(this));
    }

    startGame() {
        this.state.inGame = true;
        this.state.interval = setInterval(() => {
            this.update();
            this.draw();
        }, 10);
    }

    update() {
        this.state.players.forEach(player => {
            if (isInMiddleArea(this.ctx, player.x, player.y)) {
                player.inGame = false;
                this.restartGame();
                alert(`gracz ${player.id} jest w middle area!`);
                let canvas = document.getElementById("canvas");
                canvas.style.display = "none";
                let form = document.getElementById("gameForm");
                form.style.display = "block";
                clearInterval(this.state.interval);
                return;
            }

            if (!isInOuterArea(this.ctx, player.x, player.y)) {
                player.inGame = false;
                this.restartGame();
                alert(`gracz ${player.id} jest w outer area!`);
                let canvas = document.getElementById("canvas");
                canvas.style.display = "none";
                let form = document.getElementById("gameForm");
                form.style.display = "block";
                clearInterval(this.state.interval);
                return;
            }

            if (this.state.keys[player.key]) {
                player.angle -= 0.03;
            }

            player.x += Math.cos(player.angle) * player.speed;
            player.y += Math.sin(player.angle) * player.speed;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawBackground(this.ctx);

        this.state.players.forEach(player => {
            player.trail.push({ x: player.x, y: player.y });
            if (player.trail.length > trail_max_length) {
                player.trail.shift();
            }

            if (player.trail.length > 1) {
                for (let i = 1; i < player.trail.length; i++) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(player.trail[i - 1].x, player.trail[i - 1].y);
                    this.ctx.lineTo(player.trail[i].x, player.trail[i].y);

                    const gradient = this.ctx.createLinearGradient(
                        player.trail[i - 1].x,
                        player.trail[i - 1].y,
                        player.trail[i].x,
                        player.trail[i].y
                    );

                    const opacity = i / player.trail.length;
                    const mainColor = this.hexToRgba(player.color.main, opacity);
                    const darkColor = this.hexToRgba(player.color.dark, opacity);

                    gradient.addColorStop(0, mainColor);
                    gradient.addColorStop(1, darkColor);

                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 3;
                    this.ctx.stroke();
                }
            }

            this.ctx.save();
            this.ctx.translate(player.x, player.y);
            this.ctx.rotate(player.angle + Math.PI);
            this.ctx.drawImage(this.image, -15, -15, 30, 30);
            this.ctx.restore();
        });
    }

    hexToRgba(h, a) {
        const r = parseInt(h.slice(1, 3), 16);
        const g = parseInt(h.slice(3, 5), 16);
        const b = parseInt(h.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    restartGame() {
        clearInterval(this.state.interval);
        this.state = initGameState(this.playersConfig);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawBackground(this.ctx);
        this.draw();
        this.startGame();
    }
}