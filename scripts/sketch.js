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

function position_canvas() {
	let w = canvas_w
	let h = canvas_h

	if (windowWidth < w * 1.1) {
		w = windowWidth * 0.9
		h = w * (canvas_w / canvas_h)
	}

	if (windowHeight < h * 1.1) {
		h = windowHeight * 0.9
		w = h * (canvas_h / canvas_w)
	}

	resizeCanvas(w, h);

  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  position_canvas();
}

function preload() {
  kev_head_im = loadImage(kev_head_im_path);
  gc_setup_im = loadImage(gc_setup_im_path);
  font_8_bit = loadFont(font_8_bit_path);
}

function setup() {
  cnv = createCanvas(canvas_w, canvas_h);
  position_canvas();

  imageMode(CENTER);
  angleMode(DEGREES);

  // TODO: make a function/class/somethin to make generating setup rows better
  // FIXME: this is pretty bad
  let x = width * 0.14;
  let h = height / 6
  for (let y = h; y < height - h; y += h * 0.7) {
  	const gc_p = createVector(x, y);
  	const gc_setup = new GCSetup(gc_p, -1, h, true, gc_setup_im);
  	gc_setups.push(gc_setup);
  }

  x = width * 0.35;
  for (let y = h; y < height - h; y += h * 0.7) {
  	const gc_p = createVector(x, y);
  	const gc_setup = new GCSetup(gc_p, 1, h, true, gc_setup_im);
  	gc_setups.push(gc_setup);
  }


  x = width * 0.69;
  for (let y = h; y < height - h; y += h * 0.7) {
  	const gc_p = createVector(x, y);
  	const gc_setup = new GCSetup(gc_p, -1, h, true, gc_setup_im);
  	gc_setups.push(gc_setup);
  }

  x = width * 0.9;
  for (let y = h; y < height - h; y += h * 0.7) {
  	const gc_p = createVector(x, y);
  	const gc_setup = new GCSetup(gc_p, 1, h, true, gc_setup_im);
  	gc_setups.push(gc_setup);
  }

  kevin = new Kevin(height / 10, kev_head_im);
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
