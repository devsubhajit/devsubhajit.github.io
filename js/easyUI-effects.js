/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
function bubbleEffect() {
    var mainCanvas = document.getElementById("myCanvas");
    var themeColor = mainCanvas.getAttribute('data-theme');
    mainCanvas.setAttribute('width', screenWidth);
    mainCanvas.setAttribute('height', screenHeight);

    var mainContext = mainCanvas.getContext('2d');
    var circles = new Array();
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    function Circle(radius, speed, width, xPos, yPos) {
        this.radius = radius;
        this.speed = speed;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.opacity = .05 + Math.random() * .5;
        this.counter = 0;
        var signHelper = Math.floor(Math.random() * 2);
        if (signHelper == 1) {
            this.sign = -1;
        } else {
            this.sign = 1;
        }
    }
    Circle.prototype.update = function () {
        this.counter += this.sign * this.speed;
        mainContext.beginPath();
        mainContext.arc(this.xPos + Math.cos(this.counter / 100) * this.radius,
                this.yPos + Math.sin(this.counter / 100) * this.radius,
                this.width,
                0,
                Math.PI * 2,
                false);
        mainContext.closePath();
        mainContext.fillStyle = 'rgba(' + themeColor + ',' + this.opacity + ')';
        mainContext.fill();
    };

    function drawCircles() {
        for (var i = 0; i < 100; i++) {
            var randomX = Math.round(-200 + Math.random() * screenWidth + 100);
            var randomY = Math.round(-200 + Math.random() * screenHeight + 200);
            var speed = .2 + Math.random() * 3;
            var size = 5 + Math.random() * 5;
            var circle = new Circle(25, speed, size, randomX, randomY);
            circles.push(circle);
        }
        draw();
    }
    drawCircles();

    function draw() {
        mainContext.clearRect(0, 0, screenWidth, screenHeight);
        for (var i = 0; i < circles.length; i++) {
            var myCircle = circles[i];
            myCircle.update();
        }
        requestAnimationFrame(draw);
    }
}

// ------------- particle effects --------------
function particleEffect() {
    var NUM_PARTICLES = ((ROWS = 60) * (COLS = 600)),
            THICKNESS = Math.pow(50, 2),
            SPACING = 3,
            MARGIN = 100,
            COLOR = 000,
            DRAG = 0.95,
            EASE = 0.25,
            container,
            particle,
            canvas,
            mouse,
            stats,
            list,
            ctx,
            tog,
            man,
            dx, dy,
            mx, my,
            d, t, f,
            a, b,
            i, n,
            w, h,
            p, s,
            r, c;

    particle = {
        vx: 0,
        vy: 0,
        x: 0,
        y: 0
    };

    function init() {
        container = document.getElementById('container');
        canvas = document.createElement('canvas');

        ctx = canvas.getContext('2d');
        man = false;
        tog = true;

        list = [];

        w = canvas.width = COLS * SPACING + MARGIN * 2;
        h = canvas.height = ROWS * SPACING + MARGIN * 2;

        container.style.marginLeft = Math.round(w * -0.5) + 'px';
        container.style.marginTop = Math.round(h * -0.5) + 'px';
        container.style.opacity = 0.7;

        for (i = 0; i < NUM_PARTICLES; i++) {

            p = Object.create(particle);
            p.x = p.ox = MARGIN + SPACING * (i % COLS);
            p.y = p.oy = MARGIN + SPACING * Math.floor(i / COLS);

            list[i] = p;
        }

        container.addEventListener('mousemove', function (e) {

            bounds = container.getBoundingClientRect();
            mx = e.clientX - bounds.left;
            my = e.clientY - bounds.top;
            man = true;

        });

        if (typeof Stats === 'function') {
            document.body.appendChild((stats = new Stats()).domElement);
        }

        container.appendChild(canvas);
    }

    function step() {

        if (stats)
            stats.begin();

        if (tog = !tog) {

            if (!man) {

                t = +new Date() * 0.001;
                mx = w * 0.5 + (Math.cos(t * 2.1) * Math.cos(t * 0.9) * w * 0.45);
                my = h * 0.5 + (Math.sin(t * 3.2) * Math.tan(Math.sin(t * 0.8)) * h * 0.45);
            }

            for (i = 0; i < NUM_PARTICLES; i++) {

                p = list[i];

                d = (dx = mx - p.x) * dx + (dy = my - p.y) * dy;
                f = -THICKNESS / d;

                if (d < THICKNESS) {
                    t = Math.atan2(dy, dx);
                    p.vx += f * Math.cos(t);
                    p.vy += f * Math.sin(t);
                }

                p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
                p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;

            }

        } else {

            b = (a = ctx.createImageData(w, h)).data;

            for (i = 0; i < NUM_PARTICLES; i++) {

                p = list[i];
                b[n = (~~p.x + (~~p.y * w)) * 4] = b[n + 1] = b[n + 2] = COLOR, b[n + 3] = 255;
            }

            ctx.putImageData(a, 0, 0);
        }

        if (stats)
            stats.end();

        requestAnimationFrame(step);
    }

    init();
    step();
}

//window.onload = function(){
//  var mainBody = document.getElementsByTagName('body')[0];
//  var effect = mainBody.getAttribute('data-effect');
//  if(effect === 'bubble'){
//      bubbleEffect();
//  }
//};