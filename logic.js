const INTERVAL = 100;

toastr.options.timeOut = 1000;
toastr.info('init');

var circles = []

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
  circles = []
}

function loop() {
  clearCanvas();
  for (var i = 0; i < circles.length; i++) {
    move(circles[i]);
    drawCircle(circles[i]);
  }
  for (var i = 0; i < circles.length; i++) {
    checkSpheresCollisions(circles[i]);
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
    toastr.info(distance + ' ' + radiusSum);
    if (distance <= (circle.radius + col.radius)) {
      toastr.error('collision', {
        timeOut: 2000
      });
    }
  }
}
