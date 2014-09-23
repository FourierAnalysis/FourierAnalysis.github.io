var AP2={}; // AP2 stands for Approximation (with 2 terms)
AP2.div    = document.getElementById('divApproximation2');
AP2.size    = 4.5;
AP2.t1      = 0;
AP2.t2      = 0;
AP2.xGraph = 1.5*AP2.size;
AP2.animated = false;

AP2.range  = SD.rangeMaker  ({xMin: -1.2*AP2.size, xMax: 4*AP2.size, yMin: -AP2.size, yMax: AP2.size});
AP2.scene  = SD.sceneMaker  ({div: AP2.div, range: AP2.range});
AP2.yAxis  = SD.lineMaker   ({x1:0, x2:0, y1:AP2.range.yMin, y2:AP2.range.yMax, style:'--', width:"1px"});
AP2.xAxis  = SD.lineMaker   ({y1:0, y2:0, x1:AP2.range.xMin, x2:AP2.range.xMax, style:'--', width:"1px"});

AP2.circle1 = SD.circleMaker ({ x:0,  y:0, r:3});
AP2.circle1.svgAttributes["fill"] = "none";
AP2.circle1.svgAttributes["stroke"] = "DarkViolet";
AP2.circle1.svgAttributes["vector-effect"] = "non-scaling-stroke";
AP2.circle1.svgAttributes["stroke-width"] = "2px";
AP2.circle1.htmlClasses.push("firstCircle");

AP2.vector1 = SD.lineMaker   ({x1:0, y1:0, color:'red'});
AP2.point1  = SD.circleMaker ({r:0.1, svgAttributes: {fill: '#111111'}});

AP2.circle2 = SD.circleMaker ({r:AP2.circle1.r/3});
AP2.circle2.svgAttributes["fill"] = "none";
AP2.circle2.svgAttributes["stroke"] = "MediumSpringGreen";
AP2.circle2.svgAttributes["vector-effect"] = "non-scaling-stroke";
AP2.circle2.svgAttributes["stroke-width"] = "2px";
AP2.circle2.htmlClasses.push("secondCircle");

AP2.vector2 = SD.lineMaker   ({x1:0, y1:0, color:'red'});
AP2.point2  = SD.circleMaker ({r:0.1, svgAttributes: {fill: '#111111'}});

AP2.arrow  = SD.lineMaker   ({x2:AP2.xGraph, style:'->', arrowSize: AP2.size/10, width:'1px', color:'SpringGreen'});
AP2.fRange = SD.rangeMaker  ({xMin: AP2.xGraph, yMin: -4, yMax: 4});
AP2.graph  = SD.functionGraphMaker({range: AP2.fRange, numberOfSegments: 100});
AP2.graph.htmlClasses.push('AproximationGraph');


AP2.add = function () {

  this.scene.add(this.xAxis);
  this.scene.add(this.yAxis);

  this.scene.add(this.circle1);
  this.scene.add(this.vector1);

  this.scene.add(this.circle2);
  this.scene.add(this.vector2);

  this.scene.add(this.arrow);
  this.scene.add(this.graph);

  this.scene.add(this.point1);
  this.scene.add(this.point2);

};

AP2.updateObjects = function () {

  var r1 = this.circle1.r;
  var x1 = r1 * Math.cos(this.t1);
  var y1 = r1 * Math.sin(this.t1);

  this.point1.x = x1;
  this.point1.y = y1;

  this.vector1.x2 = x1;
  this.vector1.y2 = y1;

  var r2 = this.circle2.r;
  var x2 = x1 + r2 * Math.cos(this.t2);
  var y2 = y1 + r2 * Math.sin(this.t2);

  this.circle2.x = x1;
  this.circle2.y = y1;

  this.vector2.x1 = x1;
  this.vector2.y1 = y1;
  this.vector2.x2 = x2;
  this.vector2.y2 = y2;

  this.point2.x  = x2;
  this.point2.y  = y2;

  this.arrow.x1 = x2;
  this.arrow.y1 = y2;
  this.arrow.y2 = y2;

  this.graph.range.xMax = Math.min(this.xGraph + this.t1, this.range.xMax);
  var obj = this;
  this.graph.f = function (x0) {return r1*Math.sin(obj.t1 - x0 + obj.xGraph) + r2*Math.sin(obj.t2 - 3*x0 +3*obj.xGraph)};
};

AP2.plot = function () {
  AP2.updateObjects();
  this.scene.plotSVG();
};



AP2.animate = function (speed) {
  if(!this.animated) {
    var v = speed;
    if(!v) v=1;
    var obj = this;
    var move = function() {
      obj.t1 += 0.04*v;
      obj.t2 = 3*obj.t1;
      obj.plot();
    };
    this.animated = setInterval(move, 40);
  }
  else {
    clearInterval(this.animated);
    this.animated=false;
  }
};



AP2.changeButtonName = function (form) {
  if (this.animated) form.control.value = "Parar";
  else               form.control.value = "Animar";
};
