var bird;
var pipes = [];
var mic;
var sliderBottom;
var sliderTop;
var clapping = false;

// Creating the sketch canvas (size of the play area window)
function setup() {
  createCanvas(1000, 600);
  // Creating a new mic audio input-in object
  mic = new p5.AudioIn();
  // Gets the mic to start listening
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
  // Generates two slider with an increse of 0.01
  sliderBottom = createSlider(0, 1, 0.1, 0.01);
  sliderTop = createSlider(0, 1, 0.4, 0.01);
}

function draw() {
  background(0);

  var vol= mic.getLevel();

    // For all pipes in the array, spawn them and update them.
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        console.log("Gameover");
      }
      // Removes old/offscreen pipes from the array due to memory
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

  bird.update();
  bird.show();

  // Adds a new pipe to the array every 120th frames
  if (frameCount % 112 == 0) {
    pipes.push(new Pipe());
  }

  var thresholdTop = sliderTop.value();
  var thresholdBottom = sliderBottom.value();

  if (vol > thresholdTop && !clapping) {
    bird.up();
    clapping = true;
  } 

  // If the clapping sound level ever gets below the bottom threshold, set it to false
  if (vol < thresholdBottom) {
    clapping = false;
  }
  // Drawing a rectangle which will fill up with a green color wehn volume is picked up
  fill(0, 190 , 0);
  var topY = map(vol, 0, 2, height, 0);
  rect(width - 50, topY, 50, height - topY);

  // Drawing the threshold the slider controls
  var topY = map(thresholdTop, 0, 1, height, 0);
  stroke(255, 0, 0);
  strokeWeight(5);
  line(width -50, topY, width, topY);

  var bottomY = map(thresholdBottom, 0, 1, height, 0);
  stroke(0, 0, 255);
  strokeWeight(5);
  line(width -50, bottomY, width, bottomY);

  
}

// Function controlling which key you press to move the bird.js object
function keyPressed() {
  if (key == ' ') {
      bird.up();
  }
}