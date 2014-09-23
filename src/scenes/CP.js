var CP={}; // CP stands for ComplexPlane
CP.div    = document.getElementById('divComplexPlane');
CP.size   = 4;
CP.space  = 0.3;

CP.range  = SD.rangeMaker  ({xMin: -CP.size/4, xMax: CP.size, yMin: -CP.size/4, yMax: CP.size});
CP.scene  = SD.sceneMaker  ({div: CP.div, range: CP.range});
CP.yAxis  = SD.lineMaker   ({x1:0, x2:0, y1:CP.range.yMin, y2:CP.range.yMax, style:'--', width:"1px"});
CP.xAxis  = SD.lineMaker   ({y1:0, y2:0, x1:CP.range.xMin, x2:CP.range.xMax, style:'--', width:"1px"});

CP.point  = SD.circleMaker ({ x:2,  y:3, r:0.05, svgAttributes: {fill: '#253439'}});
CP.vector = SD.lineMaker   ({x1:0, y1:0, x2:CP.point.x, y2:CP.point.y, style: '->', arrowSize: CP.size/10, color:'red'});
CP.xProj  = SD.lineMaker   ({x1:CP.point.x, y1:CP.point.y, x2:CP.point.x, y2:0, style:'--', color:'#1e88ab'});
CP.yProj  = SD.lineMaker   ({x1:CP.point.x, y1:CP.point.y, x2:0, y2:CP.point.y, style:'--', color:'#1e88ab'});
CP.re     = SD.lineMaker   ({x1:0, y1:-CP.space, x2:CP.point.x, y2:-CP.space, style:'<->', width:'1px', arrowSize: CP.size/20});
CP.im     = SD.lineMaker   ({x1:-CP.space, y1:0, x2:-CP.space, y2:CP.point.y, style:'<->', width:'1px', arrowSize: CP.size/20});



CP.add = function () {
  this.scene.add(this.xAxis);
  this.scene.add(this.yAxis);

  this.scene.add(this.xProj);
  this.scene.add(this.yProj);
  this.scene.add(this.vector);
  this.scene.add(this.point);  
  this.scene.add(this.re);
  this.scene.add(this.im);
};

CP.updateObjects = function () {
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
  if (x>5*this.re.arrowSize)   this.re.style = '<->';
  else                         this.re.style = '>-<';
  if (y>5*this.im.arrowSize)   this.im.style = '<->';
  else                         this.im.style = '>-<';

};

CP.plot = function () {
  CP.updateObjects();
  this.scene.plotSVG();
};
