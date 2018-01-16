/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var w = window.innerWidth;
var h = window.innerHeight;

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
//window.onload = function(){
//  var mainBody = document.getElementsByTagName('body')[0];
//  var effect = mainBody.getAttribute('data-effect');
//  if(effect === 'bubble'){
//      bubbleEffect();
//  }
//};



function globalFunctions() {
    var souzi = document.getElementById('souzi');
//    var souziPulse = souzi.getElementsByClassName('easyui-puller-effect')[0];
    var souzimsg = souzi.getElementsByClassName('souzi-messageBox')[0];
    var souziexp = souzi.getElementsByClassName('souzi-expressions')[0];
    var uilogo = document.getElementsByClassName('easyui-logo')[0];
    var uinav = uilogo.getElementsByClassName('easyui-navigation')[0];
    var followMebuble = document.getElementsByClassName('easyui-pullbox');
    var aboutUI = document.getElementById('easyui-about');
    var menuList = uinav.getElementsByTagName('li');
    window.onmousedown = function () {
        uinav.style.opacity = 0;
        setTimeout(function () {
            uinav.style.display = 'none';
        }, 600);
    };
    uilogo.onmousedown = function (event) {
        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
        uinav.style.display = 'block';
        setTimeout(function () {
            uinav.style.opacity = 1;
        }, 10);
    };
    for (liNumber = 0; liNumber < menuList.length; liNumber++) {
        menuList[liNumber].onmouseover = function () {
            var subnav = this.getElementsByTagName('ul')[0];
            if (subnav !== undefined) {
                subnav.style.display = 'block';
            }
        };
        menuList[liNumber].onmouseout = function () {
            var subnav = this.getElementsByTagName('ul')[0];
            if (subnav !== undefined) {
                subnav.style.display = 'none';
            }
        };
    }
    for (followLi = 0; followLi < followMebuble.length; followLi++) {
        var clicks = 0;
        followMebuble[followLi].onmousedown = function () {
            clicks += 1;
            if (clicks === 1) {
                souzi.style.left = (5 + Math.random() * 50) + '%';
                souzi.style.top = (5 + Math.random() * 30) + '%';
                souzi.classList.add('active');
                souzimsg.style.opacity = 1;
                souzimsg.innerHTML = 'hello, I am friend of Subhajit, your guide for this website';
                souziexp.innerHTML = ': D';
                setTimeout(function () {
                    souzimsg.innerHTML = 'follow me';
                    souziexp.innerHTML = ': )';
                }, 4000);
                setTimeout(function () {
                    souzimsg.innerHTML = '';
                    souzimsg.style.opacity = 0;
                    souzimsg.style.padding = 0 + 'px';
                    // -------- animating souzi to left -----
                    var souzileft = souzi.offsetLeft;
                    function frame() {
                        souzileft++;
                        souzi.style.left = souzileft + 'px'; // show frame
                        if (souzileft === (w - 60)) { // check finish condition
                            clearInterval(souziid);
                            aboutUI.style.left = 98 + '%';
                            souzimsg.innerHTML = 'pull me left';
                            souzimsg.style.left = 'auto';
                            souzimsg.style.right = '30px';
                            souzimsg.style.opacity = '1';
                            souzimsg.style.textAlign = 'right';

                        }
                    }
                    var souziid = setInterval(frame, 2); // draw every 2ms
                    souzi.onmousedown = function () {
                        var auiLef = aboutUI.offsetWidth;
                        var souziLeft = souzi.offsetLeft;
                        document.onmousemove = function (e) {
                            souzi.classList.remove('easyui-commonTrans');
                            aboutUI.classList.remove('easyui-commonTrans');
                            e = e || event;
                            souzi.style.left = e.pageX - 25 + 'px';
                            souzi.style.top = e.pageY - 25 + 'px';
//                            // ------ opening the about element
                            var souziLeft2 = souzi.offsetLeft;
                            if (souziLeft >= (w - 100)) {
                                souzimsg.innerHTML = '';
                                souziexp.innerHTML = ': x';
                                aboutUI.style.left = (e.pageX + 10) + 'px';
                                var aboutUIleft = aboutUI.offsetLeft;
                                if (aboutUIleft <= (w - (auiLef - 20))) {
                                    souzi.style.left = e.pageX - 25 + 'px';
                                    document.onmousemove = null;
                                    souzimsg.innerHTML = 'Done';
                                    souziexp.innerHTML = ': )';
                                    setTimeout(function () {
                                        souziexp.innerHTML = '';
                                        souzimsg.innerHTML = '';
                                        souzi.classList.remove('active');
                                        document.getElementById('blackOverlay').style.display = 'block';
                                        aboutUI.style.backgroundColor = 'rgba(255,255,255,1)';
                                        aboutUI.getElementsByTagName('header')[0].style.opacity = 1;//
                                        setTimeout(function () {
                                            document.getElementById('closeAboutUI-easyui').style.bottom = 0;
                                        }, 500);
                                    }, 1000);
                                }

                                this.onmouseup = function () {
                                    document.onmousemove = null;
                                    if (aboutUIleft > (w - (auiLef - 30))) {
                                        souzi.classList.add('easyui-commonTrans');
                                        aboutUI.classList.add('easyui-commonTrans');
                                        souzimsg.innerHTML = 'pul for about';
                                        souziexp.innerHTML = ': o';
                                        setTimeout(function () {
                                            aboutUI.style.left = (w - 10) + 'px';
                                            souzi.style.left = w - 50 + 'px';
                                        }, 100);
//
                                    }
                                };

                            }
                            if (souziLeft2 >= (w - 60)) {
                                aboutUI.style.left = 99 + '%';
                                souzimsg.innerHTML = 'Ready to go';
                                souziexp.innerHTML = ': o';
                            }
                        };
                        this.onmouseup = function () {
                            document.onmousemove = null;
                        };

                    };
                    document.getElementById('closeAboutUI-easyui').onclick = function () {
                        this.setAttribute("style", " ");
                        setTimeout(function () {
                            aboutUI.classList.add('easyui-commonTrans');
                            aboutUI.getElementsByTagName('header')[0].style.opacity = 0;
                            aboutUI.style.backgroundColor = 'rgba(0,0,0,0.5)';
                            setTimeout(function () {
                                aboutUI.style.left = 100 + '%';
                                document.getElementById('blackOverlay').setAttribute("style", " ");
                            }, 100);
                        }, 500);
                        setTimeout(function () {
                            souzi.classList.add('active');
                            souzi.style.left = (5 + Math.random() * 50) + '%';
                            souziexp.innerHTML = ': ?';
                            aboutUI.getElementsByTagName('header')[0].setAttribute("style", " ");
                            aboutUI.setAttribute("style", " ");
                        }, 800);
                    };

                    souzi.ondragstart = function () {
                        return false;
                    };
                }, 6000);

            }
            if (clicks >= 2) {
                souzimsg.innerHTML = 'to view this, move me to the left';
                souziexp.innerHTML = ': {o';
                setTimeout(function () {
                    souzimsg.innerHTML = '';
                    souziexp.innerHTML = ': |';
                }, 7000);
            }
        };
    }
}
function showCoords(event) {
    var movespeed = 50;
    var canmovespeed = 3.5;
    var uilogo = document.getElementsByClassName('easyui-logo')[0];
    var mainCanvas = document.getElementById("myCanvas");
    var docx = event.clientX;
    var docy = event.clientY;
    var xcenter = window.innerWidth / 2;
    var ycenter = window.innerHeight / 2;
    var dx = xcenter - docx;
    var dy = ycenter - docy;
    uilogo.style.left = -dx * movespeed / 100 + 'px';
    uilogo.style.top = -dy * movespeed / 100 + 'px';
    mainCanvas.style.left = -dx * canmovespeed / 100 + 'px';
    mainCanvas.style.top = -dy * canmovespeed / 100 + 'px';

}

function productGlobals() {
    var aboutProduct = document.getElementsByClassName('easyui-product-about-switch')[0];
    var overlayBlack = document.getElementById('blackOverlay');
    var allUi = document.getElementById('alui');
    aboutProduct.onclick = function () {
        if (this.innerHTML === '||||') {
            this.innerHTML = 'X';
            this.style.color = '#fff';
            this.style.transform = 'rotate(0deg)';
            overlayBlack.style.display = 'block';
            document.getElementsByClassName('about-product-info')[0].style.right = 0 + 'px';
        }else if(this.innerHTML === 'X') {
            this.innerHTML = '||||';
            this.removeAttribute('style');
            overlayBlack.style.display = 'none';
            document.getElementsByClassName('about-product-info')[0].style.right = -502 + 'px';
        }
    };
    allUi.onclick = function(){
      if(this.innerHTML === 'All UI'){
          this.innerHTML = 'close';
          document.getElementById('uilist').style.left = 0+'px';
      }else if(this.innerHTML === 'close') {
          this.innerHTML = 'All UI';
          document.getElementById('uilist').style.left = -200+'px';
      }
    };
}


function touchHandler(event) {
    var touch = event.changedTouches[0];
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
            touch.screenX, touch.screenY,
            touch.clientX, touch.clientY, false,
            false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}
// -- call **init()** in document.ready function 

// ---------------- canvas ------------- effect -------------


window.onload = function () {
    init();
    var mainBody = document.getElementsByTagName('body')[0];
    var pagename = mainBody.getAttribute('data-page');
    if (pagename === 'index') {
        globalFunctions();
    }
    if (pagename === 'product') {
        productGlobals();
    }
    var effect = mainBody.getAttribute('data-effect');
    if (effect === 'bubble') {
        bubbleEffect();
    }
    if(effect === 'particle'){
        particleEffect();
    }

};
window.onmousemove = function (event) {
    var mainBody = document.getElementsByTagName('body')[0];
    var pagename = mainBody.getAttribute('data-page');
    if (pagename === 'index') {
        showCoords(event);
    }
};