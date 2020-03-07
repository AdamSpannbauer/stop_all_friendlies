const canvas_w = 512;
const canvas_h = 512;

const font_8_bit_path = 'assets/8_bit_wonder.ttf';
const kev_head_im_path = 'assets/kev_head.png';

let kev_head_im;
let kevin;

let kev_talk = false;

function preload() {
  kev_head_im = loadImage(kev_head_im_path);
  font_8_bit = loadFont(font_8_bit_path);
}

function setup() {
  createCanvas(canvas_w, canvas_h);
  imageMode(CENTER);

  kevin = new Kevin(100, kev_head_im);
}

function draw() {
  background(30, 30, 50);
  kevin.update();
  kevin.draw();

  if (frameCount % 50 == 0) {
  	kev_talk = !kev_talk;
  }

  if (kev_talk) {
  	kevin.talk();
  }
}
