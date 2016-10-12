/**
 * Created by Nat on 2016-10-12.
 */
var canvas = document.getElementById("particles");
var ctx = canvas.getContext('2d');
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;
var circles = [];
var midPointX = W/2;
var midPointY = H/2;
var velocityX = 0;
var velocityY = 0.1;

function Ball(ctx) {
    this.create = function () {
        this.radius = 2 + Math.random() * 5;
        this.x = midPointX;
        this.y = midPointY;
        this.vx = 10 * (Math.random() - 0.5);
        this.vy = 10 * (Math.random() - 0.5);
        this.ax = (Math.random() * (velocityX));
        this.ay = (Math.random() * (velocityY));

        this.red = Math.round(Math.random()) * 255;
        this.green = Math.round(Math.random()) * 255;
        this.blue = Math.round(Math.random()) * 255;
    };
    this.draw = function () {
        ctx.fillStyle = "rgba(" + this.red + ", " + this.green +", " + this.blue + ", 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    };
    this.move = function () {
        this.x += this.vx;
        this.y += this.vy;

        this.vx += this.ax;
        this.vy += this.ay;

        this.radius -= 0.01
    }
}

for (var i = 0; i < 100; i++) {
    var ball = new Ball(ctx);
    ball.create();
    circles.push(ball);
}

function drawFrame() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, W, H);
    circles.forEach(function(circle) {
        if(circle.radius > 0 && circle.x <= W && circle.x >= 0 && circle.y <= H && circle.y >= 0) {
            circle.draw();
            circle.move();
        }
        else {
            circle.create();
        }
    });
}

setInterval(drawFrame, 1500/60);