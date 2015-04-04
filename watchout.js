// start slingin' some d3 here.

// Benjamin's Brainstorming
// ID on SVG tag
// D3 adds asteroids and player
// Have asteroids move to and from the edges (not just anywhere on the canvas)

// <image x="90" y="-65" width="30" height="30" transform="rotate(45)" xlink:href="asteroid.png"/>

// d3.select("svg")
// .append("image")
// .attr("x", 90)
// .attr("y", 65)
// .attr("width", 25)
// .attr("height", 25)
// .attr("xlink:href", "asteroid.png");

function randomPositions() {
  for (var i = 0; i < 10; i++) {
   positions[i] = [Math.random() * 1100 + 50,  Math.random() * 850 + 50];
  }
};

function update() {
  randomPositions();

  selection.data(positions).transition()
  .attr("x", xPos)
  .attr("y", yPos);

  setTimeout(update, 300);
};

function xPos(d) {
  return d[0];
};

function yPos(d) {
  return d[1];
};


var drag = d3.behavior.drag()  
  .on('dragstart', function() { player.style('fill', 'red'); })
  .on('drag', function() { player.attr('cx', d3.event.x) .attr('cy', d3.event.y); })
  .on('dragend', function() { player.style('fill', 'black'); });

var player = d3.select("svg")
  .append("circle")
  .attr('cx', 600)
  .attr('cy', 450)
  .attr('r', 12)
  .call(drag);



var positions = [];

randomPositions();

var selection = d3.select("svg")
  .selectAll("image")
  .data(positions);

selection.enter()
  .append("image")
  .attr("x", xPos)
  .attr("y", yPos)
  .attr("width", 25)
  .attr("height", 25)
  .attr("xlink:href", "asteroid.png");

update();
 // selection.transition().attr("x", 1150);
