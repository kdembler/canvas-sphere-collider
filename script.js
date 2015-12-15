document.write("I'm working");

function drawTest() {
  var canvas = document.getElementById("mainCanvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
