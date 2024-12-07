let sliderR, sliderG, sliderB;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // sliders
  sliderR = createSlider(0, 255, 127);
  sliderG = createSlider(0, 255, 127);
  sliderB = createSlider(0, 255, 127);

  sliderR.position(width / 2 - 100, height / 2 - 50);
  sliderG.position(width / 2 - 100, height / 2);
  sliderB.position(width / 2 - 100, height / 2 + 50);

  // styles
  sliderR.style('width', '200px');
  sliderG.style('width', '200px');
  sliderB.style('width', '200px');
	
	sliderR.style('border-radius', '50px');
  sliderG.style('border-radius', '50px');
  sliderB.style('border-radius', '50px');

  sliderR.style('background', 'rgb(255,0,0)');
  sliderG.style('background', 'rgb(0,255,0)');
  sliderB.style('background', 'rgb(0,0,255)');
	
	
	sliderR.class('customSlider redSlider');
  sliderG.class('customSlider greenSlider');
  sliderB.class('customSlider blueSlider');
}

function draw() {
  let r = sliderR.value();
  let g = sliderG.value();
  let b = sliderB.value();

  background(r, g, b);

  sliderR.input(() => {
    let offsetR = sliderR.value();
    sliderG.value(constrain(offsetR - 100, 0, 130));
    sliderB.value(map(offsetR, 130, 50, 50, 130));
  });

  sliderG.input(() => {
    let offsetG = sliderG.value();
    sliderR.value(constrain(offsetG * 1.5, 0, 255));
    sliderB.value(map(offsetG, 130, 50, 50, 130));
  });

  sliderB.input(() => {
    let offsetB = sliderB.value();
    sliderR.value(map(offsetB, 130, 50, 50, 130));
    sliderG.value(constrain(offsetB * 0.3, 0, 255));
  });

	//text
  textAlign(CENTER);
  textSize(22);
  fill(255);
 	text(`change the background color to RGB: 0, 255, 0`, width / 2, height / 2 + 120);
	textSize(15);
	text(`R: ${r}`, width / 2 , height / 2 + 150);
  text(`G: ${g}`, width / 2, height / 2 + 180);
  text(`B: ${b}`, width / 2, height / 2 + 210);
}