// speedway.js
import Game from './game.js';
import { isInMiddleArea, isInOuterArea } from './board.js';
import { initGameState } from './init.js';
import { drawBackground } from './board.js';

export default class Speedway extends Game {
    constructor() {
        super();
    }

    update() {
        super.update();
        if (isInMiddleArea(this.ctx, this.state.x, this.state.y)) {
            this.restartGame();
            alert("Jesteś w middle area!");
        } else if (!isInOuterArea(this.ctx, this.state.x, this.state.y)) {
            this.restartGame();
            alert("Jesteś w outer area!");
        }
    }

    restartGame() {
        clearInterval(this.state.interval);
        this.state = initGameState();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawBackground(this.ctx);
        this.draw();
        this.startGame();
    }
}