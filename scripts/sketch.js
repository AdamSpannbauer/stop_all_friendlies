import Kevin from './kevin.js';
import HitBox from './ecb.js';
import gc_setup_row from './gc_setup_row.js';

const canvas_w = 512;
const canvas_h = 512;
let cnv;

const font_8_bit_path = 'assets/8_bit_wonder.ttf';
const kev_head_im_path = 'assets/kev_head.png';
const gc_setup_im_path = 'assets/setup.png';

let font_8_bit;
let gc_setup_im;
let kev_head_im;
let kevin;

const gc_setups = [];

let kev_talk = false;

const { Engine } = Matter;
const { World } = Matter;
const engine = Engine.create();
engine.world.gravity.y = 0;

let top_wall;
let bottom_wall;
let left_wall;
let right_wall;

function position_canvas() {
  let w = canvas_w;
  let h = canvas_h;

  if (windowWidth < w * 1.1) {
    w = windowWidth * 0.9;
    h = w * (canvas_w / canvas_h);
  }

  if (windowHeight < h * 1.1) {
    h = windowHeight * 0.9;
    w = h * (canvas_h / canvas_w);
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
  rectMode(CENTER);

  const xs = [width * 0.18, width * 0.42, width * 0.65, width * 0.86]
  const dirs = [-1, 1, -1, 1]
  const h = height / 8;
  for (let i = 0; i < xs.length; i++) {
    const row = gc_setup_row(xs[i], h, dirs[i], true, gc_setup_im, World, engine)
    gc_setups.push(...row)
  }

  kevin = new Kevin(height / 11, kev_head_im, font_8_bit, World, engine);

  top_wall = new HitBox(createVector(width / 2, -30), width, 70, World, engine, { isStatic: true });
  bottom_wall = new HitBox(createVector(width / 2, height + 30), width, 70, World, engine, { isStatic: true });
  left_wall = new HitBox(createVector(-30, height / 2), 70, height, World, engine, { isStatic: true });
  right_wall = new HitBox(createVector(width + 30, height / 2), 70, height, World, engine, { isStatic: true });
}

function draw() {
  background(30, 30, 50);
  Engine.update(engine);

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
  rect(width / 2, height / 2, width, height);
}


window.preload = preload;
window.windowResized = windowResized;
window.setup = setup;
window.draw = draw;
