var TC={}; // TC stands for TwoCircles
TC.div     = document.getElementById('divTwoCircles');
TC.size    = 4.3;
TC.t1      = 1;
TC.t2      = 2.5;

TC.range   = SD.rangeMaker  ({xMin: -TC.size, xMax: TC.size, yMin: -TC.size, yMax: TC.size});
TC.scene   = SD.sceneMaker  ({div: TC.div, range: TC.range});
TC.yAxis   = SD.lineMaker   ({x1:0, x2:0, y1:TC.range.yMin, y2:TC.range.yMax, style:'--', width:'1px'});
TC.xAxis   = SD.lineMaker   ({y1:0, y2:0, x1:TC.range.xMin, x2:TC.range.xMax, style:'--', width:'1px'});

TC.circle1 = SD.circleMaker ({ x:0,  y:0, r:3});
TC.circle1.svgAttributes["fill"] = "none";
TC.circle1.svgAttributes["stroke"] = "DarkViolet";
TC.circle1.svgAttributes["vector-effect"] = "non-scaling-stroke";
TC.circle1.svgAttributes["stroke-width"] = "2px";
TC.circle1.htmlClasses.push("firstCircle");

TC.point1  = SD.circleMaker ({r:0.1, svgAttributes: {fill: '#253439'}});
TC.vector1 = SD.lineMaker   ({x1:0, y1:0, style: '-', arrowSize: TC.size/15, color:'red'});
TC.re     = SD.lineMaker   ({x1:0, y1:0, y2:0, width:'3px', color: '#253439'});
TC.im     = SD.lineMaker   ({x1:0, y1:0, x2:0, width:'3px', color: '#253439'});

TC.circle2 = SD.circleMaker ({r:1});
TC.circle2.svgAttributes["fill"] = "none";
TC.circle2.svgAttributes["stroke"] = "MediumSpringGreen";
TC.circle2.svgAttributes["vector-effect"] = "non-scaling-stroke";
TC.circle2.svgAttributes["stroke-width"] = "3px";
TC.circle2.htmlClasses.push("secondCircle");

TC.xAxis2  = SD.lineMaker   ({style:'--', width:'1px'});
TC.yAxis2  = SD.lineMaker   ({style:'--', width:'1px'});
TC.point2  = SD.circleMaker ({r:0.1, svgAttributes: {fill: '#253439'}});
TC.vector2 = SD.lineMaker   ({x1:0, y1:0, style: '->', arrowSize: TC.size/18, color:'red'});






TC.add = function () {

  this.scene.add(this.xAxis);
  this.scene.add(this.yAxis);

  this.scene.add(this.circle1);
  this.scene.add(this.vector1);
  this.scene.add(this.re);
  this.scene.add(this.im);

  this.scene.add(this.xAxis2);
  this.scene.add(this.yAxis2);
  this.scene.add(this.vector2);
  this.scene.add(this.circle2);

  this.scene.add(this.point1);
  this.scene.add(this.point2);

};

TC.updateObjects = function () {

  var r1 = this.circle1.r;
  var x1 = r1 * Math.cos(this.t1);
  var y1 = r1 * Math.sin(this.t1);

  this.point1.x = x1;
  this.point1.y = y1;

  this.vector1.x2 = x1;
  this.vector1.y2 = y1;


  var r2 = this.circle2.r;
  var x2 = r2 * Math.cos(this.t2);
  var y2 = r2 * Math.sin(this.t2);

  var x  = x1 + x2;
  var y  = y1 + y2;

  this.xAxis2.x1 = x1-r2;
  this.xAxis2.x2 = x1+r2;
  this.xAxis2.y1 = y1;
  this.xAxis2.y2 = y1;

  this.yAxis2.x1 = x1;
  this.yAxis2.x2 = x1;
  this.yAxis2.y1 = y1-r2;
  this.yAxis2.y2 = y1+r2;

  this.circle2.x = x1;
  this.circle2.y = y1;

  this.vector2.x1 = x1;
  this.vector2.y1 = y1;
  this.vector2.x2 = x;
  this.vector2.y2 = y;

  this.point2.x  = x;
  this.point2.y  = y;

  this.re.x2 = x;
  this.im.y2 = y;


};


TC.plot = function () {

  TC.updateObjects();
  this.scene.plotSVG();

};
