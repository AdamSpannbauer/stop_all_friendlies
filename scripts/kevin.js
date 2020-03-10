import SpeechBubble from './speech_bubble.js';
import HitBox from './ecb.js';


class Kevin {
  constructor(h, kev_head_im, font, world, engine) {
    this.kev_head_im = kev_head_im;
    this.dir = 1;

    this.h = h;
    this.w = this.im_width();

    this.p = createVector(width / 2, height / 2);
    this.x_off = random(100);
    this.y_off = random(100);

    this.hbox = new HitBox(this.p, this.w * 0.8, this.h * 0.8, world, engine, { friction: 0.99 });

    this.speech_bubble = new SpeechBubble(
      ' STOP  ALL \nFRIENDLIES',
      createVector(),
      1,
      font,
    );

    this.update();
  }

  im_width() {
    return this.h * (this.kev_head_im.width / this.kev_head_im.height);
  }

  update() {
    // For auto moving
    // const prev_x = this.p.x

    // this.p.set(
    //   noise(this.x_off) * width,
    //   noise(this.y_off) * height,
    // );

    // if (this.p.x > prev_x) {
    //   this.dir = 1
    // } else if (this.p.x < prev_x) {
    //   this.dir = -1
    // }

    // this.x_off += 0.005;
    // this.y_off += 0.005;

    if (keyIsDown(LEFT_ARROW)) {
      Matter.Body.applyForce(this.hbox.body, this.hbox.body.position, { x: -0.001, y: 0 });
      this.dir = -1;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      Matter.Body.applyForce(this.hbox.body, this.hbox.body.position, { x: 0.001, y: 0 });
      this.dir = 1;
    }

    if (keyIsDown(UP_ARROW)) {
      Matter.Body.applyForce(this.hbox.body, this.hbox.body.position, { x: 0, y: -0.001 });
    }

    if (keyIsDown(DOWN_ARROW)) {
      Matter.Body.applyForce(this.hbox.body, this.hbox.body.position, { x: 0, y: 0.001 });
    }
  }


  talk() {
    this.speech_bubble.mouth_p.set(
      this.hbox.body.position.x + this.dir * this.w * 0.4,
      this.hbox.body.position.y + this.h * 0.3,
    );

    this.speech_bubble.dir = this.dir;

    this.speech_bubble.draw();
  }

  draw() {
    push();
    translate(this.hbox.body.position.x, this.hbox.body.position.y);
    scale(this.dir, 1.0);
    image(this.kev_head_im, 0, 0, this.w, this.h);
    pop();
  }
}

export default Kevin;
