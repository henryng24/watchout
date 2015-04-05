
// <image x="90" y="-65" width="30" height="30" transform="rotate(45)" xlink:href="asteroid.png"/>


function randomPositions() {
  for (var i = 0; i < 10; i++) {
   positions[i] = [Math.random() * 1100 + 50,  Math.random() * 850 + 50];
  }
};

function update() {
  randomPositions();
  score++;

  selection.data(positions)
    .transition()
    .duration(10000)
    .attr("x", xPos)
    .attr("y", yPos)
    .tween(null, function(d,i,a) {
      return function (t) {
        collisionCheck(this.x.baseVal.value, this.y.baseVal.value);
        // if (Math.round(t * 100) % 2) {
        //   this.setAttribute("height", 50);
        //   this.setAttribute("width", 50);
        //   this.setAttribute("transform", "translate(-25,-25)");
        // } else {
        //   this.setAttribute("height", 25);
        //   this.setAttribute("width", 25);
        //   this.setAttribute("transform", "translate(-12.5,-12.5)");
        // }
        // var asdf =  d3.interpolateRound(0, 100)
        // console.log(asdf(t));
      };
    });

  if (score > highScore) {
    highScore = score;
  }

  d3.select('.current')
    .select('span')[0][0].innerHTML = score;

  d3.select('.high')
    .select('span')[0][0].innerHTML = highScore;

  setTimeout(update, 20000);
};

function xPos(d) {
  return d[0];
};

function yPos(d) {
  return d[1];
};

function collisionCheck(x, y) {
  

  if(Math.abs(player.attr('cx') - x) < 25 && Math.abs(player.attr('cy') - y) < 25) {
    counter++;
    score = 0;
    d3.select('.collisions')
      .select('span')[0][0].innerHTML = counter;
  }

  
};


var highScore = 0;
var counter = 0;
var score = 0;

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
  .attr("transform", "translate(-12.5,-12.5)")
  .attr("class", "spinner")
  .attr("xlink:href", "asteroid.png");

update();
 // selection.transition().attr("x", 1150);


