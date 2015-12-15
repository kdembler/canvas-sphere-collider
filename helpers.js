var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

function Circle(position, radius, direction) {
  this.position = position;
  this.radius = radius;
  this.direction = direction;
  this.color = "#000000";
}

function drawCircle(circle) {
  var posX = circle.position.x;
  var posY = circle.position.y;
  var radius = circle.radius;
  var color = circle.color;
  toastr.info(sprintf('drawTest((%f,%f),%f,%s)', posX, posY, radius, color));
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(posX, posY, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
