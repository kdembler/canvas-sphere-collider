var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

function Vector2(x, y) {
  this.x = Number(x);
  this.y = Number(y);
}

Vector2.prototype.toString = function() {
  return sprintf('(%f, %f)', this.x, this.y);
}

function addVectors(v1, v2) {
  x = Number(v1.x + v2.x);
  y = Number(v1.y + v2.y);
  return new Vector2(x, y);
}

function multiplyVectors(v, n) {
  return new Vector2(v.x * n, v.y * n);
}

function distanceVectors(v1, v2) {
  return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

function Circle(position, radius, angle, speed, color) {
  this.position = position;
  this.radius = Number(radius);
  this.angle = Number(angle);
  this.speed = Number(speed);
  this.skips = 0;
  this.color = color;
}

Circle.prototype.toString = function() {
  return sprintf('Circle at pos: (%f, %f)', this.position.x, this.position.y);
}


function drawCircle(circle) {
  var x = circle.position.x;
  var y = circle.position.y;
  var radius = circle.radius;
  var color = circle.color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function round(float) {
  return Math.round(float * 1000) / 1000;
}
