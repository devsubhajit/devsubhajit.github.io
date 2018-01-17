/*
 * This library is created for svg charts
 * Author :: Subhajit Das
 * email :: dascorp@live.in
 */




function svgGrpah() {
    //console.log('clicked');
// ---------------------- time to get more dynamic -----------------------------   
    var allGraphs = document.querySelectorAll('[data-graph]');
    for (graphNumber = 0; graphNumber < allGraphs.length; graphNumber++) {
        allGraphs[graphNumber].setAttribute('id', 'graph' + graphNumber);
        var graphId = document.getElementById('graph' + graphNumber);
        // ----------------------- get the style attributes ----------------
        var styleArray = [];
        var graphStyle = graphId.getAttribute('data-style');
        var styleArray = graphStyle.split(",");

        var graphsvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        graphId.appendChild(graphsvg);

        graphsvg.setAttribute('class', 'graph-svg');
        var maxRange = graphId.getElementsByClassName('ui-max-value')[0].innerHTML;
        var grValues = graphId.getElementsByClassName('ui-graph-values')[0].innerHTML;
        var graphWidth = parseInt(graphId.offsetWidth);
        var graphHeight = parseInt(graphId.offsetHeight);
        var hline = Math.round(graphHeight / 5);

        graphsvg.style.width = graphWidth + 'px';
        graphsvg.style.height = graphHeight + 'px';

        var graphBg = graphId.getAttribute('data-graphbg');
        var gridStyle = graphId.getAttribute('data-grid');
        graphsvg.style.background = graphBg;

        if (graphBg === null) {
            graphBg = 'rgba(255,255,255,1)';
        }
        if (gridStyle === null) {
            gridStyle = 'rgba(0,0,0,1)';
        }
        // --------------- elements for svg styles -----------
        var defs = document.createElementNS("http://www.w3.org/2000/svg", 'defs');
        var linearGradient = document.createElementNS("http://www.w3.org/2000/svg", 'linearGradient');
        var stopOne = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
        var stopTwo = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
        // --------------------- elements for animation ----------
        var aniRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        var svgAnimate = document.createElementNS("http://www.w3.org/2000/svg", 'animate');
        // ------------------- create horizontal lines 
        function makeHlines() {
            var graphHline = document.createElementNS("http://www.w3.org/2000/svg", 'line');
            //Set stroke colour
            graphHline.style.strokeWidth = "0.5px";
            graphHline.style.fill = "none";
            graphHline.setAttribute('x1', '0');
            graphHline.setAttribute('y1', horizontalLine);
            graphHline.setAttribute('y2', horizontalLine);
            graphHline.setAttribute('x2', graphWidth);
            graphHline.setAttribute('class', 'graph-h-line');
            graphsvg.appendChild(graphHline);
            graphHline.style.stroke = gridStyle;
        }
        lineGraph();
        if (graphsvg.querySelectorAll('.graph-h-line').length <= 0) {
            for (horizontalLine = 0; horizontalLine < graphHeight; horizontalLine += hline) {
                makeHlines();
            }
        }
        var valueDiv = document.createElement('div');
        graphId.appendChild(valueDiv);
        valueDiv.style.position = 'absolute';
        valueDiv.style.display = 'none';
        valueDiv.style.opacity = 0;
        valueDiv.setAttribute('class', 'viewport');
    }


    function lineGraph() {
        // -------------------- create Vertical Lines 
        function makeVlines() {
            var graphVline = document.createElementNS("http://www.w3.org/2000/svg", 'line');
            graphVline.style.stroke = "rgba(0,0,0,1)";
            graphVline.style.strokeWidth = "0.5px";
            graphVline.style.fill = "none";
            graphVline.setAttribute('x1', gx);
            graphVline.setAttribute('y1', '0');
            graphVline.setAttribute('y2', graphHeight);
            graphVline.setAttribute('x2', gx);
            graphsvg.appendChild(graphVline);
            graphVline.style.stroke = gridStyle;
        }
        function showDots() {
            var graphDots = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            graphDots.setAttribute('cx', gx);
            graphDots.setAttribute('cy', gy);
            graphDots.setAttribute('r', 6);


            for (styleAttr = 0; styleAttr < styleArray.length; styleAttr++) {
                //---------------- dots ------------
                var dots = styleArray[styleAttr].match(/dots:.*/);
                if (dots !== null) {
                    var dotsString = dots.toString();
                }
                if (dotsString !== undefined) {
                    var dotsStringSplit = dotsString.split(':');
                }
                if (dotsStringSplit !== undefined) {
                    var dotsValue = dotsStringSplit[1];
                }
                if (dotsValue !== undefined) {
                    graphsvg.insertBefore(graphDots, graphsvg.childNodes[1]);
                }
                //---------------- dot-color ------------
                var dotColor = styleArray[styleAttr].match(/dot-style:.*/);
                if (dotColor !== null) {
                    var dotColorString = dotColor.toString();
                }
                if (dotColorString !== undefined) {
                    var dotColorStringSplit = dotColorString.split(':');
                }
                if (dotColorStringSplit !== undefined) {
                    var dotColorValue = dotColorStringSplit[1];
                }
                if (dotColorValue !== undefined) {
                    graphDots.style.fill = dotColorValue;
                }
                //---------------- dot-border ------------
                var dotBorder = styleArray[styleAttr].match(/dot-border:.*/);
                if (dotBorder !== null) {
                    var dotBorderString = dotBorder.toString();
                }
                if (dotBorderString !== undefined) {
                    var dotBorderStringSplit = dotBorderString.split(':');
                }
                if (dotBorderStringSplit !== undefined) {
                    var dotBorderValue = dotBorderStringSplit[1];
                }
                if (dotBorderValue !== undefined) {
                    var dotBorderValues = dotBorderValue.split('-');
                }
                if (dotBorderValues !== undefined) {
                    var dotBorderColor = dotBorderValues[0];
                    var dotBorderWidth = dotBorderValues[1];
                }
                if (dotBorderColor !== undefined) {
                    graphDots.style.stroke = dotBorderColor;
                }
                if (dotBorderWidth !== undefined) {
                    graphDots.style.strokeWidth = dotBorderWidth;
                }
            }

        }
        // viewValue();

        // -------------------- create path
        var graphPath = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
        // ------------ get the path attribute ----------------
        graphPath.style.strokeWidth = "2px";
        for (styleAttr = 0; styleAttr < styleArray.length; styleAttr++) {
            //---------------- color ------------
            var graphColor = styleArray[styleAttr].match(/color:.*/);
            if (graphColor !== null) {
                var colorString = graphColor.toString();
            }
            if (colorString !== undefined) {
                var colorStringSplit = colorString.split(':');
            }
            if (colorStringSplit !== undefined) {
                var colorValue = colorStringSplit[1];
            }
            // ------------------------------ mode, fill/none ----------------
            var graphMode = styleArray[styleAttr].match(/mode:.*/);
            if (graphMode !== null) {
                var modeString = graphMode.toString();
            }
            if (modeString !== undefined) {
                var modeStringSplit = modeString.split(':');
            }
            if (modeStringSplit !== undefined) {
                var modeValue = modeStringSplit[1];
            }
            // ------------------------------ grad, positive ----------------
            var graphGrade = styleArray[styleAttr].match(/gradient:.*/);
            if (graphGrade !== null) {
                var gradeString = graphGrade.toString();
            }
            if (gradeString !== undefined) {
                var gradeStringSplit = gradeString.split(':');
            }
            if (gradeStringSplit !== undefined) {
                var gradeValue = gradeStringSplit[1];
            }
            // ------------------------------ gradient-colors, color1-color2 ----------------
            var gradients = styleArray[styleAttr].match(/gradient-colors:.*/);
            if (gradients !== null) {
                var gradientsString = gradients.toString();
            }
            if (gradientsString !== undefined) {
                var gradientsStringSplit = gradientsString.split(':');
            }
            if (gradientsStringSplit !== undefined) {
                var gradientValue = gradientsStringSplit[1];
                var allGradients = gradientValue.split('-');
                var gradeintStart = allGradients[0];
                var gradeintEnd = allGradients[1];
            }
            // ----------------- style implement in line graph --------------------
            if (modeValue === undefined) {
                graphPath.style.fill = 'none';
            }
            // ------------------------ later to thinnk    
            if (gradeValue == 'positive' && modeValue !== undefined) {
                graphsvg.appendChild(defs);
                defs.appendChild(linearGradient);
                linearGradient.appendChild(stopOne);
                linearGradient.appendChild(stopTwo);
                linearGradient.setAttribute('x1', '0%');
                linearGradient.setAttribute('x2', '100%');
                linearGradient.setAttribute('y1', '0%');
                linearGradient.setAttribute('y2', '0%');
                linearGradient.setAttribute('id', 'grade-' + graphNumber);

                stopOne.setAttribute('offset', '0%');
                if (gradeintStart !== undefined) {
                    stopOne.setAttribute('stop-color', gradeintStart);
                }
                if (gradeintStart == undefined) {
                    stopOne.setAttribute('stop-color', colorValue);
                }
                stopOne.setAttribute('stop-opacity', '1');

                stopTwo.setAttribute('offset', '100%');
                if (gradeintEnd !== undefined) {
                    stopTwo.setAttribute('stop-color', gradeintEnd);
                }
                if (gradeintEnd == undefined) {
                    stopTwo.setAttribute('stop-color', graphBg);
                }
                stopTwo.setAttribute('stop-opacity', '1');
                graphPath.style.fill = 'url(#grade-' + graphNumber + ')';

            }
            if (gradeValue == undefined && modeValue !== undefined) {
                graphPath.style.fill = colorValue;
                if (colorValue === undefined) {
                    graphPath.style.fill = 'none';
                }
            }
            // ------------------------ later to thinnk     
            if (modeValue !== undefined) {
                graphPath.style.strokeWidth = '0px';
            }
            graphPath.style.stroke = colorValue;
            if (colorValue === undefined) {
                graphPath.style.stroke = '#000';
            }

        }
        // ------------- append svg elements --------------
        // -------------  need to remove the previous path/line -----------
        var pathRemove = graphId.getElementsByTagName('path');
        for (prePath = 0; prePath < pathRemove.length; prePath++) {
            pathRemove[prePath].remove();
        }
        // --------------- appending new path
        graphsvg.appendChild(graphPath);
        sideAnimation();
        // ----------------- get the values as array 
        var pathArray = grValues.split(" ");
        var valueLength = pathArray.length;
        // ----------------- lets make it ----------------
        var pathsArray = [];
        var curveS = 'S';
        var L = 'L';
        var finalGraph;
        var xLimit = Math.round(graphWidth / (valueLength - 1)); //console.log('xLimit :: ', xLimit);
        for (gline = 0; gline < valueLength; gline++) {
            var valueInPercent = (pathArray[gline] * 100) / maxRange;
            var graphInValue = (valueInPercent * graphHeight) / 100;
            var gx = Math.round(gline * xLimit); //console.log(gx);
            var gy = graphHeight - graphInValue;
            pathsArray.push(gx + ' ' + gy); //console.log(pathsArray);
            makeVlines();
            showDots();
        }
        for (styleAttr = 0; styleAttr < styleArray.length; styleAttr++) {
            var graphCorner = styleArray[styleAttr].match(/corner:.*/);
            if (graphCorner !== null) {
                var cornerString = graphCorner.toString();
            }
            if (cornerString !== undefined) {
                var cornerStringSplit = cornerString.split(':');
            }
            if (cornerStringSplit !== undefined) {
                var cornerValue = cornerStringSplit[1];
            }
            if (cornerValue == 'curved') {
                pathsArray[1] = curveS + pathsArray[1];
                break;
            }
            else if (cornerValue === undefined) {
                pathsArray[1] = pathsArray[1];
            }
        }
        pathsArray.push(L + graphWidth + ' ' + graphHeight);
        pathsArray.push(0 + ' ' + graphHeight);
        pathsArray.push(pathsArray[0]);
        // check if the graph has odd or even value cause S and L has to be set 
        if (valueLength % 2 === 0) {
            pathsArray[valueLength - 1] = L + pathsArray[valueLength - 1];
            finalGraph = pathsArray.join(" "); //console.log('finalGraph :: ', finalGraph);
        }
        else if (valueLength % 2 !== 0) {
            finalGraph = pathsArray.join(" ");
        }

        graphPath.setAttribute("d", "M" + finalGraph);
        // showing the value
        viewValue();

    }

    function sideAnimation() {
        graphsvg.appendChild(aniRect);
        aniRect.setAttribute('width', graphWidth);
        aniRect.setAttribute('height', graphHeight);
        aniRect.setAttribute('x', 0);
        aniRect.setAttribute('y', 0);
        aniRect.style.fill = graphBg;
        if (graphBg == null) {
            aniRect.style.fill = 'rgba(255,255,255,1)';
        }
        aniRect.appendChild(svgAnimate);
        svgAnimate.setAttribute('attributeName', 'x');
        svgAnimate.setAttribute('attributeType', 'XML');
        svgAnimate.setAttribute('from', 0);
        svgAnimate.setAttribute('to', graphWidth);
        svgAnimate.setAttribute('begin', '0s');
        svgAnimate.setAttribute('dur', '2s');
        svgAnimate.setAttribute('fill', 'freeze');
        svgAnimate.setAttribute('repeatCount', 1);
    }

    function viewValue() {
        var allDots = document.getElementsByTagName('circle');
        for (doti = 0; doti < allDots.length; doti++) {
            allDots[doti].onmouseover = function () {
                valueDiv.style.top = this.getAttribute('cy') + 'px';
                valueDiv.style.left = this.getAttribute('cx') + 'px';
                valueDiv.style.display = 'block';
                valueDiv.style.opacity = 1;
                var dotiCy = this.getAttribute('cy');
                var printValue = Math.round(((graphHeight - dotiCy) * maxRange) / graphHeight);
                valueDiv.innerHTML = printValue;
                this.style.opacity = '0.7';
            };
            allDots[doti].onmouseout = function () {
                valueDiv.style.opacity = 0;
                this.style.opacity = '1';
            };
        }
    }
}

document.getElementById('editOpen').onclick = function(){
  if(document.getElementById('editBox').offsetHeight === 0){
      document.getElementById('editBox').style.height = 'auto';
      this.classList.add('active');
  }else if (document.getElementById('editBox').style.height === 'auto'){
      document.getElementById('editBox').style.height = 0+'px';
      this.classList.remove('active');
  }  
};
document.getElementById('openhtml').onclick = function(){
  if(document.getElementById('htmlbox').offsetHeight === 0){
      document.getElementById('htmlbox').style.height = 'auto';
      this.classList.add('active');
  }else if(document.getElementById('htmlbox').style.height === 'auto'){
      document.getElementById('htmlbox').style.height = 0+'px';
      this.classList.remove('active');
  }  
};

var checkBox = document.getElementsByClassName('allCheck');
for (ci = 0; ci < checkBox.length; ci++) {
    var styleArrayTwo = [];
    checkBox[ci].onchange = function () {
        var styleValue = this.getAttribute('data-stylevalue');
        if (this.checked === true) {
            styleArrayTwo.push(styleValue);
        } else if (this.checked === false) {
            var indexStyle = styleArrayTwo.indexOf(styleValue);
            if (indexStyle > -1) {
                styleArrayTwo.splice(indexStyle, 1);
            }
        }
        document.getElementById('graphSubmit').onclick = function () {
            var lineColor = checkBox[2].value;
            var dotColor = document.getElementById('dot-color').value;
            var dotBorderWidth = document.getElementById('dot-border').value;
            var dotBorderColor = document.getElementById('dot-border-color').value;

            // ----------- gradiend colors 
            var gradeColorOne = document.getElementById('grade-color1').value;
            var gradeColorTwo = document.getElementById('grade-color2').value;



            styleArrayTwo.push('color:' + lineColor);
            if (document.getElementById('dots').checked === true){
                styleArrayTwo.push('dot-style:' + dotColor);
                styleArrayTwo.push('dot-border:' + dotBorderColor + '-' + dotBorderWidth);
            }
            // gradient -------- color ----------
            if (gradeColorOne !== '#000000' || gradeColorTwo !== '#000000') {
                styleArrayTwo.push('gradient-colors:' + gradeColorOne + '-' + gradeColorTwo);
            }
            var finalStyle = styleArrayTwo.join(",");
            //console.log('finalStyle :: ', finalStyle);

            // -------------- background color
            var bgColor = document.getElementById('chart-background').value;
            var gridColor = document.getElementById('chart-grid').value;

            var mxvl = document.getElementById('maximum-value').value;
            var alvls = document.getElementById('all-values').value;

            if (mxvl === '' || alvls === '') {
                document.getElementById('popMessage').style.display = 'block';
                var msgp = document.createElement('p');
                var inputError = document.createTextNode("Please fill up the maximum value, exp :  1000, and all values like this :: 204 570 600 130 400");
                msgp.appendChild(inputError);
                document.getElementById('popmsgcont').appendChild(msgp);
                document.getElementById('okay').onclick = function () {
                    document.getElementById('popmsgcont').removeChild(msgp);
                    document.getElementById('popMessage').style.display = 'none';
                };
            }


            document.getElementById('maxValue').innerHTML = mxvl;
            document.getElementById('allValues').innerHTML = alvls;

            var graphBox = document.getElementsByClassName('viewport-product')[0];
            graphBox.setAttribute('data-graphbg', bgColor);
            graphBox.setAttribute('data-grid', gridColor);

            document.getElementById('htmlbox').innerHTML = "&lt;div data-graph='line' data-graphbg='" + bgColor + "' data-grid='" + gridColor + "' data-style='" + finalStyle + "'&gt;<br/>&lt;span class='ui-max-value'&gt;" + mxvl + "&lt;/span&gt;<br/>&lt;span class='ui-graph-values'&gt;" + alvls + "&lt;/span&gt;<br/>&lt;/div&gt;";

            var svg = document.getElementsByTagName('svg')[0];
            if (svg !== undefined) {
                graphBox.removeChild(svg);
            }
            graphBox.setAttribute('data-style', finalStyle);
            svgGrpah();

            var checkBoxAll = document.getElementsByClassName('allCheck');
            for (checki = 0; checki < checkBoxAll.length; checki++) {
                checkBoxAll[checki].checked = false;
            }
            styleArrayTwo = [];
        };
    };
}