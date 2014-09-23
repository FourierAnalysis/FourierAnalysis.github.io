var UC={}; // UC stands for UnitCircle
UC.div    = document.getElementById('divUnitCircle');
UC.size   = 1.3;
UC.t      = Math.PI/6;

UC.range  = SD.rangeMaker  ({xMin: -UC.size, xMax: UC.size, yMin: -UC.size, yMax: UC.size});
UC.scene  = SD.sceneMaker  ({div: UC.div, range: UC.range});
UC.yAxis  = SD.lineMaker   ({x1:0, x2:0, y1:-UC.size, y2:UC.size, style:'--', width:'1px'});
UC.xAxis  = SD.lineMaker   ({y1:0, y2:0, x1:-UC.size, x2:UC.size, style:'--', width:'1px'});
UC.circle = SD.circleMaker ({ x:0,  y:0, r:1});
UC.circle.htmlClasses.push("firstCircle");

UC.point  = SD.circleMaker ({ x:Math.cos(UC.t),  y:Math.sin(UC.t), r:0.05, svgAttributes: {fill: '#111111'}});
UC.vector = SD.lineMaker   ({x1:0, y1:0, x2:UC.point.x, y2:UC.point.y, style: '->', arrowSize: UC.size/7, color:'red'});
UC.xProj  = SD.lineMaker   ({x1:UC.point.x, y1:UC.point.y, x2:UC.point.x, y2:0, style:'--', color:'#1e88ab'});
UC.yProj  = SD.lineMaker   ({x1:UC.point.x, y1:UC.point.y, x2:0, y2:UC.point.y, style:'--', color:'#1e88ab'});
UC.re     = SD.lineMaker   ({x1:0, y1:0, x2:UC.point.x, y2:0, width:'2px', color: '#111111'});
UC.im     = SD.lineMaker   ({x1:0, y1:0, x2:0, y2:UC.point.y, width:'2px', color: '#111111'});



UC.add = function () {

  this.scene.add(this.xAxis);
  this.scene.add(this.yAxis);
  this.scene.add(this.circle);

  this.scene.add(this.xProj);
  this.scene.add(this.yProj);
  this.scene.add(this.vector);
  this.scene.add(this.point);

  this.scene.add(this.re);
  this.scene.add(this.im);
};

UC.updateObjects = function () {

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
};

UC.plot = function () {
  UC.updateObjects();
  this.scene.plotSVG();
};
