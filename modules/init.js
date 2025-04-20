import { canvas_width, canvas_height, image_path, x, y, speed, angle } from './config.js';

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

export function initGameState() {
    return {
        x: x,
        y: y,
        speed: speed,
        angle: angle,
        keys: {},
        trail: [],
        interval: null,
        isGameRunning: false,
    };
}

export function initListeners(game) {
    window.addEventListener("keydown", (e) => game.state.keys[e.key] = true);
    window.addEventListener("keyup", (e) => game.state.keys[e.key] = false);
}