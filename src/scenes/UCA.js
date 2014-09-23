var UCA={}; // UCA stands for UnitCircleAnimated
UCA.div    = document.getElementById('divUnitCircleAnimated');
UCA.size   = 1.5;
UCA.t      = 0;
UCA.xGraph = 1.5*UCA.size;
UCA.animated = false;

UCA.range  = SD.rangeMaker  ({xMin: -UCA.size, xMax: 4*UCA.size, yMin: -UCA.size, yMax: UCA.size});
UCA.scene  = SD.sceneMaker  ({div: UCA.div, range: UCA.range});
UCA.yAxis  = SD.lineMaker   ({x1:0, x2:0, y1:UCA.range.yMin, y2:UCA.range.yMax, style:'--', width:"1px"});
UCA.xAxis  = SD.lineMaker   ({y1:0, y2:0, x1:UCA.range.xMin, x2:UCA.range.xMax, style:'--', width:"1px"});
UCA.circle = SD.circleMaker ({ x:0,  y:0, r:1});
UCA.circle.svgAttributes["fill"]         = "none";
UCA.circle.svgAttributes["stroke"]       = "DarkViolet";
UCA.circle.svgAttributes["vector-effect"]= "non-scaling-stroke";
UCA.circle.svgAttributes["stroke-width"] = "3px";
UCA.circle.htmlClasses.push("firstCircle");

UCA.point  = SD.circleMaker ({ x:Math.cos(UCA.t),  y:Math.sin(UCA.t), r:0.05, svgAttributes: {fill: '#111111'}});
UCA.vector = SD.lineMaker   ({x1:0, y1:0, x2:UCA.point.x, y2:UCA.point.y, style: '->', arrowSize: UCA.size/10, color:'red'});
UCA.xProj  = SD.lineMaker   ({x1:UCA.point.x, y1:UCA.point.y, x2:UCA.point.x, y2:0, style:'--', color:'blue'});
UCA.yProj  = SD.lineMaker   ({x1:UCA.point.x, y1:UCA.point.y, x2:0, y2:UCA.point.y, style:'--', color:'blue'});
UCA.re     = SD.lineMaker   ({x1:0, y1:0, x2:UCA.point.x, y2:0, width:'2px', color: '#111111'});
UCA.im     = SD.lineMaker   ({x1:0, y1:0, x2:0, y2:UCA.point.y, width:'2px', color: '#111111'});
UCA.arrow  = SD.lineMaker   ({x1:UCA.point.x, y1:UCA.point.y, x2:UCA.xGraph, y2:UCA.point.y, style:'->', arrowSize: UCA.size/10,
			      width:'1px', color:'SpringGreen'});
UCA.fRange = SD.rangeMaker  ({xMin: UCA.xGraph, yMin: -1.1, yMax: 1.1});
UCA.graph  = SD.functionGraphMaker({range: UCA.fRange, numberOfSegments: 60, color:'#111111'});


UCA.add = function () {
  this.scene.add(this.circle);
  this.scene.add(this.xAxis);
  this.scene.add(this.yAxis);
  this.scene.add(this.vector);
  this.scene.add(this.point);

  this.scene.add(this.re);
  this.scene.add(this.im);
  this.scene.add(this.arrow);
  this.scene.add(this.graph);
};

UCA.updateObjects = function () {

  this.point.x = Math.cos(this.t);
  this.point.y = Math.sin(this.t);

  var x = this.point.x;
  var y = this.point.y;

  this.vector.x2 = x;
  this.vector.y2 = y;

  this.xProj.x1 = x;
  this.xProj.x2 = x;
  this.xProj.y1 = y;

  this.yProj.x1 = x;
  this.yProj.y1 = y;
  this.yProj.y2 = y;

  this.re.x2 = x;
  this.im.y2 = y;

  this.arrow.x1 = x;
  this.arrow.y1 = y;
  this.arrow.y2 = y;

  var tAux = this.t/3;
  this.graph.range.xMax = Math.min(this.xGraph + tAux, this.range.xMax);
  var obj = this;
  this.graph.f = function (x0) {return Math.sin(3*tAux - 3*x0 + 3*obj.xGraph)};
};

UCA.plot = function () {
  UCA.updateObjects();
  this.scene.plotSVG();
};



UCA.animate = function (speed) {
  if(!this.animated) {
    var obj = this;
    var v=speed;
    if (!v) v=1;
    var move = function() {
      obj.t += 0.04*v;
      obj.plot();
    };
    this.animated = setInterval(move, 40);
  }
  else {
    clearInterval(this.animated);
    this.animated=false;
  }
};



UCA.changeButtonName = function (form) {
  if (this.animated) form.control.value = "Parar";
  else               form.control.value = "Animar";
};

