const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 400;
const ctx = canvas.getContext("2d");
let image = new Image();
image.src = "motor.jpg";
let x = 300; // pozycje poczatkowe
let y = 335;
let speed = 2;
let angle = Math.PI * 2;
let keys = {};
let trail = [];
let interval;
let isGameRunning = false;


window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);


function drawBackground() {
    ctx.beginPath();
    ctx.arc(600, 200, 200, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.arc(200, 200, 200, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.lineWidth = 6;
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(600, 200, 70, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.arc(200, 200, 70, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.lineWidth = 6;
    ctx.fillStyle = "blueviolet";
    ctx.fill();
    ctx.stroke();
}


function draw() {
    ctx.clearRect(x - 15, y - 15, 30, 30);


    drawBackground();

    trail.push({ x, y });
    if (trail.length > 150) {
        trail.shift();
    }

    ctx.beginPath();
    if (trail.length > 1) {
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let i = 1; i < trail.length; i++) {
            ctx.lineTo(trail[i].x, trail[i].y);
        }
    }
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * 4, y + Math.sin(angle) * 4);
    ctx.strokeStyle = "red";
    ctx.stroke();


    // const gradient = ctx.createLinearGradient(x, y, x + 30, y + 30);
    // gradient.addColorStop(0, "red");
    // gradient.addColorStop(1, "darkred");
    // ctx.fillStyle = gradient;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(image, -15, -15, 30, 30);
    ctx.restore();

}


function isInMiddleArea(x, y) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(600, 200, 70, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.arc(200, 200, 70, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    return ctx.isPointInPath(x, y);
}


function isInOuterArea(x, y) {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(600, 200, 200, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.arc(200, 200, 200, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    return ctx.isPointInPath(x, y);
}


function update() {
    if (keys["a"]) {
        angle -= 0.03;
    }
    x += Math.cos(angle) * speed;
    y += Math.sin(angle) * speed;

    if (isInMiddleArea(x, y)) {
        alert("jestes w srodku - fail");
        restartGame();
    } else if (!isInOuterArea(x, y)) {
        alert("jestes na zewnatrz - fail");
        restartGame();
    }
}


function restartGame() {
    clearInterval(interval);
    x = 300;
    y = 335;
    speed = 2;
    angle = Math.PI * 2;
    keys = {};
    trail = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    draw();

    startGame();
}


function startGame() {
    interval = setInterval(() => {
        update();
        draw();
    }, 10);
}

startGame();