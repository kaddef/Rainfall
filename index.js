var x;
var y;
let raindrop;
const rain = new Array();
function setup() {
    createCanvas(windowWidth, windowHeight);
    x = 30;
    y = 50;
    raindrop = new Raindrop(Math.random(), 400, 50)//scale, x, y (x and y optional)
    console.log(raindrop)
    console.log(`${windowWidth}||${windowHeight}`)
    var i = 0;
    while (i<200) {
        rain.unshift(new Raindrop(Math.random(), Math.random() * windowWidth, 0 - Math.random() * windowHeight))
        i++;
        console.log("A")
    }
}

function draw() {
    background(0);
    raindrop.draw();
    rain.forEach(element => {
        element.draw()
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Raindrop {
    //X and Y Coordinates are left up corner of the quad
    //First three attributes necessary. Opacity, width and height will be created or modified by using scale
    x;
    y;
    scale;
    opacity;
    width = 4;
    height = 30;
    deviation;
    speed;

    constructor(scale , x = Math.floor(Math.random() * windowWidth), y = Math.floor(Math.random() * windowHeight)) {
        this.x = x;
        this.y = y;
        this.scale = Math.round(scale * 10) / 10;
        this.attributeInitialization();
    }

    attributeInitialization() { //If object pooling is implemented, this function will make my job easier.
        this.width = 4; //To reset value ​​if object pooling is used
        this.height = 30; //To reset value ​​if object pooling is used
        this.scale = Math.round(Math.random() * 10) / 10 //This line conflicts with the constructor
        this.opacity = Math.round(map(this.scale, 0, 1, 0, 255))//Change 0 and 255 make more smooth
        //this.deviation = Math.round((Math.random() * 2 - 1) * 10) / 10 // Can I use normal distribution
        this.deviation = Math.round((Math.random() - 0.5) * 10) / 10 // USE THIS OR THE UP ONE
        this.speed = (Math.round((Math.random() + 1) * 10) / 10 ) * 10;
        this.width = this.width * (this.scale + 0.5);
        this.height = this.height * (this.scale + 0.5);
        //this.printAllAttributes();
    }

    draw() {
        //noStroke();
        fill(255, 0, 255, this.opacity); 
        quad(
            this.x,this.y, 
            this.x + this.width, this.y, 
            this.x + this.width-10*this.deviation, this.y + this.height, 
            this.x-10*this.deviation, this.y + this.height
        );

        if(this.y > windowHeight + 100) {
            this.x = Math.floor(Math.random() * windowWidth) // maybe delete this
            this.y = -100;
            this.attributeInitialization();
        } else if(this.x > windowWidth + 100 || this.x < -100) {
            this.x = Math.floor(Math.random() * windowWidth)
            this.y = -100;
            this.attributeInitialization();
        }
        this.y = this.y + this.speed;
        this.x = this.x - this.deviation;
    }

    printAllAttributes () {
        console.log(`X:${this.x}`)
        console.log(`Y:${this.y}`)
        console.log(`Scale:${this.scale}`)
        console.log(`Opacity:${this.opacity}`)
        console.log(`Width:${this.width}`)
        console.log(`Height:${this.height}`)
        console.log(`Deviation:${this.deviation}`)
        console.log(`Speed:${this.speed}`)
    }
}

// TODO
// Maybe the heavier raindrops can fall faster than the small ones