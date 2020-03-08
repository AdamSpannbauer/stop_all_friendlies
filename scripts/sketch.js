const canvas_w = 512;
const canvas_h = 512;
let cnv;

const font_8_bit_path = 'assets/8_bit_wonder.ttf';
const kev_head_im_path = 'assets/kev_head.png';
const gc_setup_im_path = 'assets/setup.png';

let kev_head_im;
let kevin;

const gc_setups = [];

let kev_talk = false;

function center_canvas() {
  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  center_canvas();
}

function preload() {
  kev_head_im = loadImage(kev_head_im_path);
  gc_setup_im = loadImage(gc_setup_im_path);
  font_8_bit = loadFont(font_8_bit_path);
}

function setup() {
  cnv = createCanvas(canvas_w, canvas_h);
  center_canvas();
  imageMode(CENTER);
  angleMode(DEGREES);

  // TODO: make a function/class/somethin to make generating setup rows better
  let x = 70;
  for (let y = 100; y < height - 100; y += 70) {
  	const gc_p = createVector(x, y);
  	const gc_setup = new GCSetup(gc_p, -1, 100, true, gc_setup_im);
  	gc_setups.push(gc_setup);
  }

  x = 180;
  for (let y = 100; y < height - 100; y += 70) {
  	const gc_p = createVector(x, y);
  	const gc_setup = new GCSetup(gc_p, 1, 100, true, gc_setup_im);
  	gc_setups.push(gc_setup);
  }


  x = 350;
  for (let y = 100; y < height - 100; y += 70) {
  	const gc_p = createVector(x, y);
  	const gc_setup = new GCSetup(gc_p, -1, 100, true, gc_setup_im);
  	gc_setups.push(gc_setup);
  }

  x = 460;
  for (let y = 100; y < height - 100; y += 70) {
  	const gc_p = createVector(x, y);
  	const gc_setup = new GCSetup(gc_p, 1, 100, true, gc_setup_im);
  	gc_setups.push(gc_setup);
  }

  kevin = new Kevin(100, kev_head_im);
}

function draw() {
  background(30, 30, 50);

  for (const gc_setup of gc_setups) {
  	gc_setup.update();
  	gc_setup.draw();
  }

  kevin.update();
  kevin.draw();

  if (frameCount % 50 == 0) {
  	kev_talk = !kev_talk;
  }

  if (kev_talk) {
  	kevin.talk();
  }

  stroke(100, 100);
  strokeWeight(5);
  noFill();
  rect(0, 0, width, height);
}
