var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

function addVectors(v1, v2) {
  x = v1.x + v2.x;
  y = v1.y + v2.x;
  return new Vector2(x, y);
}

function multiplyVector(v, n) {
  return new Vector2(v.x * n, v.y * n);
}

function Circle(position, radius, angle, speed, color) {
  this.position = position;
  this.radius = radius;
  this.angle = angle;
  this.speed = speed;
  this.color = color;
}

function drawCircle(circle) {
  var x = circle.position.x;
  var y = circle.position.y;
  var radius = circle.radius;
  var color = circle.color;
  toastr.info(sprintf('drawTest((%f,%f),%f,%s)', x, y, radius, color));
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
