import SpeechBubble from './speech_bubble.js';
import HitBox from './ecb.js';


class Kevin {
  constructor(h, kev_head_im, font, world, engine) {
    this.kev_head_im = kev_head_im;
    this.dir = 1;

    this.h = h;
    this.w = this.im_width();

    this.p = createVector(width / 2, height / 2);
    this.min_force = -0.001;
    this.max_force = 0.001;

    this.hbox = new HitBox(this.p, this.w * 0.8, this.h * 0.8, world, engine);

    this.speech_bubble = new SpeechBubble(
      ' STOP  ALL \nFRIENDLIES',
      createVector(),
      1,
      font,
    );

    this.use_mouse = true;
    this.update();
  }

  im_width() {
    return this.h * (this.kev_head_im.width / this.kev_head_im.height);
  }

  mouse_move() {
    let dx = mouseX - this.hbox.body.position.x;
    let dy = mouseY - this.hbox.body.position.y;

    if (abs(dx) < 5) {
      Matter.Body.setVelocity(this.hbox.body, { x: 0, y: this.hbox.body.velocity.y });
      dx = 0;
    }

    if (abs(dy) < 5) {
      Matter.Body.setVelocity(this.hbox.body, { x: this.hbox.body.velocity.x, y: 0 });
      dy = 0;
    }

    if (dx < this.min_force) {
      dx = this.min_force;
      this.dir = -1;
    } else if (dx > this.max_force) {
      dx = this.max_force;
      this.dir = 1;
    } else if (dx < 0) {
      this.dir = -1;
    } else if (dx > 0) {
      this.dir = 1;
    }

    if (dy < this.min_force) {
      dy = this.min_force;
    } else if (dy > this.max_force) {
      dy = this.max_force;
    }


    Matter.Body.applyForce(this.hbox.body, this.hbox.body.position, { x: dx, y: dy });
  }

  arrow_move() {
    if (keyIsDown(LEFT_ARROW)) {
      Matter.Body.applyForce(this.hbox.body, this.hbox.body.position, { x: this.min_force, y: 0 });
      this.dir = -1;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      Matter.Body.applyForce(this.hbox.body, this.hbox.body.position, { x: this.max_force, y: 0 });
      this.dir = 1;
    }

    if (keyIsDown(UP_ARROW)) {
      Matter.Body.applyForce(this.hbox.body, this.hbox.body.position, { x: 0, y: this.min_force });
    }

    if (keyIsDown(DOWN_ARROW)) {
      Matter.Body.applyForce(this.hbox.body, this.hbox.body.position, { x: 0, y: this.max_force });
    }
  }

  update() {
    if (keyIsDown(ESCAPE)) {
      this.use_mouse = !this.use_mouse;
    }

    if (this.use_mouse) {
      this.mouse_move();
    } else {
      this.arrow_move();
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
