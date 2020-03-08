import SpeechBubble from './speech_bubble.js';


class Kevin {
  constructor(h, kev_head_im, font) {
    this.kev_head_im = kev_head_im;

    this.h = h;
    this.w = this.im_width();

    this.p = createVector();
    this.prev_p = createVector();
    this.x_off = random(100);
    this.y_off = random(100);
    this.update();

    this.speech_bubble = new SpeechBubble(
      ' STOP  ALL \nFRIENDLIES',
      createVector(),
      1,
      font,
    );
  }

  im_width() {
    return this.h * (this.kev_head_im.height / this.kev_head_im.width);
  }

  update() {
    this.prev_p.set(this.p.x, this.p.y);

    this.p.set(
      noise(this.x_off) * width,
      noise(this.y_off) * height,
    );

    this.x_off += 0.005;
    this.y_off += 0.005;
  }

  dir() {
    if (this.prev_p.x - this.p.x > 0) {
      return -1;
    }
    return 1;
  }

  talk() {
    this.speech_bubble.mouth_p.set(
      this.p.x + this.dir() * this.w * 0.4,
      this.p.y + this.h * 0.3,
    );

    this.speech_bubble.dir = this.dir();

    this.speech_bubble.draw();
  }

  draw() {
    push();
    translate(this.p.x, this.p.y);
    scale(this.dir(), 1.0);
    image(this.kev_head_im, 0, 0, this.h, this.w);
    pop();
  }
}

export default Kevin;
