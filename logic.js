const INTERVAL = 10;

toastr.options = {
  "showDuration": "50000",
  "hideDuration": "50000",
  "timeOut": "50000",
  "extendedTimeOut": "50000"
}
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
    checkSphereCollisions(circles[i]);
    checkBorderCollisions(circles[i]);
  }
}

function move(circle) {
  var radians = round(toRadians(circle.angle));
  var directionVector = new Vector2(round(Math.sin(radians)), round(-Math.cos(radians)));
  var moveVector = multiplyVectors(directionVector, circle.speed / (1000 / INTERVAL));
  var newPosition = addVectors(circle.position, moveVector);
  circle.position = newPosition;
}

function checkSphereCollisions(circle) {
  for (var i = 0; i < circles.length; i++) {
    var col = circles[i];
    if (circle === col) continue;
    var distance = round(distanceVectors(circle.position, col.position));
    if (distance <= (circle.radius + col.radius)) {
      var x = col.position.x - circle.position.x;
      var y = col.position.y - circle.position.y;
      var a = circle.angle;
      var radians = Math.atan2(x, -y);
      if (radians < 0) radians += 2 * Math.PI;
      var collisionAngle = toDegrees(radians);
      var newAngle = 0;

      if ((a - collisionAngle) % 90 == 0) newAngle = (a + 180) % 360; //perpendicular
      else {
        var upper = (collisionAngle + 90) % 360;
        if (upper == 0) upper = 360;
        var lower = (collisionAngle - 90) % 360;
        if (collisionAngle > 90) {
          if (a > collisionAngle) newAngle = (a + ((upper - a)) * 2) % 360;
          if (a < collisionAngle) newAngle = (a - ((a - lower)) * 2) % 360;
        } else {
          if (a < collisionAngle + 90) newAngle = (a + ((upper - a)) * 2) % 360;
          if (a > collisionAngle + 90) newAngle = (a - ((a - lower)) * 2) % 360;
        }
      }
      circle.angle = newAngle;
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
  var collisionAngle = 0;

  if (x + r >= w) {
    collision = true;
    right = true;
    collisionAngle = 90;
  }
  if (x - r <= 0) {
    collision = true;
    left = true;
    collisionAngle = 270;
  }
  if (y + r >= h) {
    collision = true;
    bottom = true;
    collisionAngle = 180;
  }
  if (y - r <= 0) {
    collision = true;
    top = true;
    collisionAngle = 0;
  }

  if (!collision) return;

  if ((a - collisionAngle) % 90 == 0) newAngle = (a + 180) % 360; //perpendicular
  else if (left && bottom) newAngle = 45;
  else if (left && top) newAngle = 135;
  else if (right && top) newAngle = 225;
  else if (right && bottom) newAngle = 315;
  else {
    var upper = (collisionAngle + 90) % 360;
    if (upper == 0) upper = 360;
    var lower = (collisionAngle - 90) % 360;
    if (lower < 0) lower += 360;

    if (collisionAngle > 90) {
      if (a > collisionAngle) newAngle = (a + ((upper - a) * 2)) % 360;
      if (a < collisionAngle) newAngle = (a - ((a - lower) * 2)) % 360;
    } else {
      if (a < (collisionAngle + 90)) newAngle = (a + ((upper - a) * 2)) % 360;
      if (a > (collisionAngle + 90)) newAngle = (a - ((a - lower) * 2)) % 360;
    }
  }

  circle.angle = newAngle;
}
