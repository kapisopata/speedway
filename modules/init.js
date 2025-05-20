import { canvas_width, canvas_height, image_path } from './config.js';

const playerColors = {
    1: { main: '#FF0000', dark: '#8B0000' },
    2: { main: '#FFFF00', dark: '#CCCC00' },
    3: { main: '#00FF00', dark: '#008000' },
    4: { main: '#0000FF', dark: '#00008B' }
};

export function initCanvas() {
    const canvas = document.getElementById("canvas");
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    const ctx = canvas.getContext("2d");
    return { canvas, ctx };
}

export function initImage() {
    const image = new Image();
    image.src = image_path;
    return image;
}

export function initGameState(playersConfig) {
    const gameState = {
        players: playersConfig.map((player, index) => {
            const playerState = {
                ...player,
                x: 200,
                y: 300 + (index * 25),
                // prevX: 200,
                // prevY: 300 + (index * 25),
                speed: 2,
                angle: Math.PI * 2,
                trail: [],
                // laps: 0,
                interval: null,
                inGame: true,
                color: playerColors[player.id] || playerColors[1],
            };
            return playerState;
        }),
        keys: {},
    };
    // console.log(gameState);
    return gameState;
}

export function initListeners(game) {
    window.addEventListener("keydown", (e) => game.state.keys[e.key] = true);
    window.addEventListener("keyup", (e) => game.state.keys[e.key] = false);
}