export function drawBackground(ctx) {
    ctx.beginPath();
    ctx.arc(600, 200, 200, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.arc(200, 200, 200, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 6;
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(600, 200, 70, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.arc(200, 200, 70, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.lineWidth = 6;
    ctx.fillStyle = "blueviolet";
    ctx.fill();
    ctx.stroke();
}

export function isInMiddleArea(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(600, 200, 70, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.arc(200, 200, 70, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    return ctx.isPointInPath(x, y);
}

export function isInOuterArea(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(600, 200, 200, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx.arc(200, 200, 200, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.closePath();
    return ctx.isPointInPath(x, y);
}