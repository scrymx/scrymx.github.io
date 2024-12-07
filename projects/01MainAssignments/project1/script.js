let tvIMG;
let buttonIMG;
let channelIMG;
let font;
let font2;
let tv;
let points;
let bounds;
let TVOn = false;
let CHOn = false;
let button;
let channelButton;
let editibleString = "type something...";
let pointcolor = 0;

// scaling font
let speed = 0.008;
let amplitude = 0.7;

function preload() {
  tvIMG = loadImage("assets/images/tv.png");
  font = loadFont("assets/fonts/Roboto-Bold.ttf");
  font2 = loadFont("assets/fonts/Tiny5-Regular.ttf");
}

class Tv {
  constructor(x, y, color, IMG) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.IMG = IMG;
  }
  display() {
    image(this.IMG, 0, 0, width, height);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // red button
  button = createImg("assets/images/button_red.png", "red button");
  button.size(60, 60);
  button.position(20, windowHeight / 2 - 30);
  button.mousePressed(toggleTV);

  // channel buttons
  channelButton = createImg("assets/images/button_channels.png", "channel buttons");
  channelButton.size(60, 120);
  channelButton.position(20, windowHeight / 2 + 50);
  channelButton.mousePressed(toggleCH);

  tv = new Tv(0, 0, 0, tvIMG);

  // point text
  points = font.textToPoints("iAD TV", 0, 0, 10, {
    sampleFactor: 5,
    simplifyThreshold: 0,
  });
  bounds = font.textBounds("iAD TV", 0, 0, 10);

  textFont(font2);
  textSize(width / 3);
  textAlign(CENTER, CENTER);
}

function draw() {
  textAlign(CENTER, CENTER);
  background(230);

  adjustButtonSizes();

  if (!CHOn) {
    push();
    fill(pointcolor);
    let scaleFactor = sin(frameCount * speed) * amplitude;
    let scaleW = (width / bounds.w) * scaleFactor;
    let scaleH = (height / bounds.h) * scaleFactor;
    let w = bounds.w * scaleW;
    let h = bounds.h * scaleH;
    let fontX = -bounds.x * scaleW + width / 2 - w / 2;
    let fontY = -bounds.y * scaleH + height / 2 - h / 2;
    translate(fontX, fontY);
    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      let X = mouseX * random(0.01) + p.x * scaleW;
      let Y = random(4) + p.y * scaleH;
      rect(X, Y, 8, 8);
    }
    pop();
		
		
  } else {
    background(0, 255, 0);
    fill(0);
    let sizef = height * 0.04;
    textSize(sizef);
    for (let y = 0; y < height / sizef; y++) {
      let frequency = radians(frameCount * 3);
      let offset = y * 0.9;
      let amplitude = mouseX * 0.03;
      let x = width / 2 + sin(frequency + offset) * amplitude;
      text(editibleString, x, y * sizef);
    }
  }

  if (!TVOn) {
    fill(0);
    rect(0, 0, width, height);
  }

  tv.display();
}

// responsive button
function adjustButtonSizes() {
  if (windowWidth <= 1200) {
    button.size(30, 30);
		button.position(windowWidth/1.5, windowHeight * 0.95);
    channelButton.size(30, 60);
		channelButton.position(windowWidth/2, windowHeight * 0.93);
		channelButton.style("transform", "rotate(90deg)");
  } else {
    button.size(60, 60);
    channelButton.size(60, 120);
  }
}

// toggle on/off
function toggleTV() {
  TVOn = !TVOn;
}

// change channel
function toggleCH() {
  CHOn = !CHOn;
}

function keyTyped() {
  if (keyCode == ENTER) {
    editibleString = "";
  } else {
    editibleString = editibleString + key;
  }
}

function mouseClicked() {
  if (pointcolor === 0) {
    pointcolor = 255;
  } else {
    pointcolor = 0;
  }
}

// responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}