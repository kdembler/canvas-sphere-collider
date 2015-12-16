const INTERVAL = 10;

toastr.options.timeOut = 1000;
toastr.info('init');

var circles = [];

var jobID = 0;

function handleForm(form) {
  var x = form.posX.value;
  var y = form.posY.value;
  var radius = form.radius.value;
  var angle = form.angle.value;
  var speed = form.speed.value;
  var color = form.color.value;
  toastr.info(sprintf('adding circle: (%f,%f), %f, %f, %f, %s', x, y, radius, angle, speed, color));
  addCircle(x, y, radius, angle, speed, color);
}

function addCircle(x, y, radius, angle, speed, color) {
  var position = new Vector2(x, y);
  var circle = new Circle(position, radius, angle, speed, color);
  drawCircle(circle);
  circles.push(circle);
}

function start() {
  toastr.info('starting loop');
  jobID = setInterval(loop, INTERVAL);
}

function reset() {
  clearInterval(jobID);
  clearCanvas();
  circles = [];
}

function loop() {
  clearCanvas();
  for (var i = 0; i < circles.length; i++) {
    move(circles[i]);
    drawCircle(circles[i]);
  }
  for (var i = 0; i < circles.length; i++) {
    checkSpheresCollisions(circles[i]);
    checkBorderCollisions(circles[i]);
  }
}

function move(circle) {
  var radians = round(toRadians(circle.angle));
  // document.write(radians);
  var directionVector = new Vector2(round(Math.sin(radians)), round(-Math.cos(radians)));
  // document.write('vector: ' + directionVector);
  var moveVector = multiplyVector(directionVector, circle.speed / (1000 / INTERVAL));
  // document.write('<br>move: ' + moveVector);
  var newPosition = addVectors(circle.position, moveVector);
  // document.write('<br>new: ' + newPosition);
  circle.position = newPosition;
}

function checkSpheresCollisions(circle) {
  for (var i = 0; i < circles.length; i++) {
    var col = circles[i];
    if (circle === col) continue;
    var distance = round(distanceVectors(circle.position, col.position));
    var radiusSum = circle.radius + col.radius;
    // toastr.info(distance + ' ' + radiusSum);
    if (distance <= (circle.radius + col.radius)) {
      //collision
    }
  }
}

function checkBorderCollisions(circle) {
  var a = circle.angle;
  var x = circle.position.x,
    y = circle.position.y;
  var r = circle.radius;
  var w = canvas.width,
    h = canvas.height;

  var top = false,
    bottom = false,
    left = false,
    right = false;
  var collision = false;

  var newAngle = 0;

  if (x + r >= w) {
    right = true;
    collision = true;
  }
  if (x - r <= 0) {
    left = true;
    collision = true;
  }
  if (y + r >= h) {
    bottom = true;
    collision = true;
  }
  if (y - r <= 0) {
    top = true;
    collision = true;
  }

  if (!collision) return;
  toastr.error('collision');

  if (a % 90 == 0) newAngle = (a + 180) % 360; //perpendicular
  else if (left && bottom) newAngle = 45;
  else if (left && top) newAngle = 135;
  else if (right && top) newAngle = 225;
  else if (right && bottom) newAngle = 315;
  else if (left && a > 270) newAngle = (a + (360 - a) * 2) % 360;
  else if (left && a < 270) newAngle = (a - (a - 180) * 2) % 360;
  else if (right && a > 90) newAngle = (a + (180 - a) * 2) % 360;
  else if (right && a < 90) newAngle = (a - a * 2) % 360;
  else if (top && a < 90) newAngle = (a + (90 - a) * 2) % 360;
  else if (top && a > 90) newAngle = (a - (a - 270) * 2) % 360;
  else if (bottom && a > 180) newAngle = (a + (270 - a) * 2) % 360;
  else if (bottom && a < 180) newAngle = (a - (a - 90) * 2) % 360;

  circle.angle = newAngle;
}
