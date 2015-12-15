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
  circles.push(circle);
}

function start() {
  jobID = setInterval(loop, 1000);
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
  }
}

function move(circle) {
  circle.position = addVectors(circle.position, multiplyVector(circle.direction, speed));
}
