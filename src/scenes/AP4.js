var AP4={}; // AP4 stands for Approximation (with 3 terms)
AP4.div    = document.getElementById('divApproximation4');
AP4.size    = 4.5;
AP4.t1      = 0;
AP4.t2      = 0;
AP4.t3      = 0;
AP4.t4      = 0;
AP4.xGraph = 1.5*AP4.size;
AP4.animated = false;

AP4.range  = SD.rangeMaker  ({xMin: -1.2*AP4.size, xMax: 4*AP4.size, yMin: -AP4.size, yMax: AP4.size});
AP4.scene  = SD.sceneMaker  ({div: AP4.div, range: AP4.range});
AP4.xAxis  = SD.lineMaker   ({y1:0, y2:0, x1:AP4.range.xMin, x2:AP4.range.xMax, style:'--', width:"1px"});
AP4.yAxis  = SD.lineMaker   ({x1:0, x2:0, y1:AP4.range.yMin, y2:AP4.range.yMax, style:'--', width:"1px"});


AP4.circle1 = SD.circleMaker ({ x:0,  y:0, r:3});
AP4.circle1.htmlClasses.push("firstCircle");

AP4.vector1 = SD.lineMaker   ({x1:0, y1:0, color:'red'});
AP4.point1  = SD.circleMaker ({r:0.1, svgAttributes: {fill: '#111111'}});

AP4.circle2 = SD.circleMaker ({r:AP4.circle1.r/3});
AP4.circle2.htmlClasses.push("secondCircle");

AP4.vector2 = SD.lineMaker   ({x1:0, y1:0, color:'red'});
AP4.point2  = SD.circleMaker ({r:0.1, svgAttributes: {fill: '#111111'}});

AP4.circle3 = SD.circleMaker ({r:AP4.circle1.r/5});
AP4.circle3.htmlClasses.push("thirdCircle");

AP4.vector3 = SD.lineMaker   ({x1:0, y1:0, color:'red'});
AP4.point3  = SD.circleMaker ({r:0.1, svgAttributes: {fill: '#111111'}});

AP4.circle4 = SD.circleMaker ({r:AP4.circle1.r/7});
AP4.circle4.htmlClasses.push("fourthCircle");

AP4.vector4 = SD.lineMaker   ({x1:0, y1:0, color:'red'});
AP4.point4  = SD.circleMaker ({r:0.1, svgAttributes: {fill: '#111111'}});

AP4.arrow  = SD.lineMaker   ({x2:AP4.xGraph, style:'->', arrowSize: AP4.size/10, width:'1px', color:'SpringGreen'});
AP4.fRange = SD.rangeMaker  ({xMin: AP4.xGraph, yMin: -4, yMax: 4});
AP4.graph  = SD.functionGraphMaker({range: AP4.fRange, numberOfSegments: 150, color:'#111111'});
AP4.graph.htmlClasses.push('AproximationGraph');



AP4.add = function () {

  this.scene.add(this.xAxis);
  this.scene.add(this.yAxis);

  this.scene.add(this.circle1);
  this.scene.add(this.vector1);

  this.scene.add(this.circle2);
  this.scene.add(this.vector2);

  this.scene.add(this.circle3);
  this.scene.add(this.vector3);

  this.scene.add(this.circle4);
  this.scene.add(this.vector4);

  this.scene.add(this.arrow);
  this.scene.add(this.graph);

  this.scene.add(this.point1);
  this.scene.add(this.point2);
  this.scene.add(this.point3);
  this.scene.add(this.point4);

};


AP4.updateObjects = function () {

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

  var r3 = this.circle3.r;
  var x3 = x2 + r3 * Math.cos(this.t3);
  var y3 = y2 + r3 * Math.sin(this.t3);

  this.circle3.x = x2;
  this.circle3.y = y2;

  this.vector3.x1 = x2;
  this.vector3.y1 = y2;
  this.vector3.x2 = x3;
  this.vector3.y2 = y3;

  this.point3.x  = x3;
  this.point3.y  = y3;

  var r4 = this.circle4.r;
  var x4 = x3 + r4 * Math.cos(this.t4);
  var y4 = y3 + r4 * Math.sin(this.t4);

  this.circle4.x = x3;
  this.circle4.y = y3;

  this.vector4.x1 = x3;
  this.vector4.y1 = y3;
  this.vector4.x2 = x4;
  this.vector4.y2 = y4;

  this.point4.x  = x4;
  this.point4.y  = y4;

  this.arrow.x1 = x4;
  this.arrow.y1 = y4;
  this.arrow.y2 = y4;

  this.graph.range.xMax = Math.min(this.xGraph + this.t1, this.range.xMax);
  var obj = this;
  this.graph.f = function (x0) {return r1*Math.sin(obj.t1 -   x0 +   obj.xGraph) +
				       r2*Math.sin(obj.t2 - 3*x0 + 3*obj.xGraph) + 
			               r3*Math.sin(obj.t3 - 5*x0 + 5*obj.xGraph) +
			               r4*Math.sin(obj.t4 - 7*x0 + 7*obj.xGraph);};

};

AP4.plot = function () {
  AP4.updateObjects();
  this.scene.plotSVG();
};



AP4.animate = function (speed) {
  if (!this.animated) {
  var v = speed;
  if(!v) v=1;
  var obj = this;
  var move = function() {
    obj.t1 += 0.04*v;
    obj.t2 = 3*obj.t1;
    obj.t3 = 5*obj.t1;
    obj.t4 = 7*obj.t1;
    obj.plot();
  };
  this.animated = setInterval(move, 40);
  }
  else {
    clearInterval(this.animated);
    this.animated=false;
  }
};


AP4.changeButtonName = function (form) {
  if (this.animated) form.control.value = "Parar";
  else               form.control.value = "Animar";
};
