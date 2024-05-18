var x;
var y;
function setup() {
    createCanvas(windowWidth, windowHeight);
    x = 30;
    y = 50;
}

function draw() {
    background(220);
    quad(x, y, x + 20, y, x + 15, y + 80, x-5, y + 80);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}