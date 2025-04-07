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
    if (trail.length > 250) {
        trail.shift();
    }

    if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
            ctx.beginPath();
            ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
            ctx.lineTo(trail[i].x, trail[i].y);

            const gradient = ctx.createLinearGradient(
                trail[i - 1].x,
                trail[i - 1].y,
                trail[i].x,
                trail[i].y
            );

            const opacity = i / trail.length;
            gradient.addColorStop(0, `rgba(255, 0, 0, ${opacity})`);
            gradient.addColorStop(1, `rgba(139, 0, 0, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }

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