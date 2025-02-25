let startContext, samples, button1, button2, button3, button4,
delTimeSlider, FeedbackSlider, distSlider, wetSlider;

let rev = new Tone.Reverb(0.5).toDestination();
let dist = new Tone.Distortion(2).connect(rev);
let del = new Tone.FeedbackDelay(0.5, 0.5).connect(dist);
del.wet.value = 0.5;

function preload() {
  samples = new Tone.Players({
    cat_meow: "media/cat_meow.mp3",
    seagull_squall: "media/seagull_squall.mp3",
    dog_woof: "media/dog_woof.mp3",
    water_drip: "media/water_drip.mp3",
  }).connect(del);
}

function setup() {
  createCanvas(400, 400);

  startContext = createButton("Start Audio Context!");
  startContext.position(10, 10);
  startContext.mousePressed(startAudioContext);

  button1 = createButton("Play Seagull Squall");
  button1.position(10, 40);
  button1.mousePressed(() => { samples.player("seagull_squall").start(); });

  button2 = createButton("Play Cat Meow");
  button2.position(10, 70);
  button2.mousePressed(() => { samples.player("cat_meow").start(); });

  button3 = createButton("Play Dog Woof");
  button3.position(150, 40);
  button3.mousePressed(() => { samples.player("dog_woof").start(); });

  button4 = createButton("Play Water Drip");
  button4.position(150, 70);
  button4.mousePressed(() => { samples.player("water_drip").start(); });

  // Delay Time Slider
  delTimeSlider = createSlider(0, 1, 0.5, 0.01);
  delTimeSlider.position(10, 100);
  delTimeSlider.input(() => { del.delayTime.value = delTimeSlider.value(); });

  // Feedback Slider
  FeedbackSlider = createSlider(0, 0.99, 0.5, 0.01);
  FeedbackSlider.position(10, 145);
  FeedbackSlider.input(() => { del.feedback.value = FeedbackSlider.value(); });

  // Distortion Slider
  distSlider = createSlider(0, 10, 2, 0.1);
  distSlider.position(10, 190);
  distSlider.input(() => { dist.distortion = distSlider.value(); });

  // Wet Level Slider
  wetSlider = createSlider(0, 1, 0.5, 0.01);
  wetSlider.position(10, 235);
  wetSlider.input(() => { del.wet.value = wetSlider.value(); });
}

function draw() {
  background(220);
  text("Delay Time: " + delTimeSlider.value(), 10, 140);
  text("Feedback: " + FeedbackSlider.value(), 10, 185);
  text("Distortion: " + distSlider.value(), 10, 230);
  text("Wet: " + wetSlider.value(), 10, 275);
}

function startAudioContext() {
  if (Tone.context.state !== 'running') {
    Tone.start().then(() => {
      console.log("Audio Context Started!");
    }).catch(err => {
      console.error("Error starting audio context:", err);
    });
  } else {
    console.log("Audio Context Already Running!");
  }
}