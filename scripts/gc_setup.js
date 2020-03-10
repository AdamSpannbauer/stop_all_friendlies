import HitBox from './hitbox.js';


class GCSetup {
  constructor(p, dir, h, on, gc_setup_im, world, engine) {
    this.p = p;
    this.dir = dir;

    this.on = on;

    this.gc_setup_im = gc_setup_im;
    this.h = h;
    this.w = this.im_width();

    const hbox_p = createVector(
      this.p.x - this.dir * this.w * 0.2,
      this.p.y + this.h * 0.1,
    );
    this.hbox = new HitBox(hbox_p, this.w * 0.4, this.h * 0.8, world, engine, { isStatic: true });
  }

  im_width() {
    return this.h * (this.gc_setup_im.width / this.gc_setup_im.height);
  }

  update() {
    if (random() > 0.99) {
      this.on = !this.on;
    }
  }

  draw() {
    push();
    translate(this.p.x, this.p.y);
    scale(this.dir, 1.0);

    if (this.on) {
      noStroke();
      fill(255, random(150, 250));
    } else {
      noStroke();
      fill(0);
    }
    arc(
      -this.w / 3.5,
      -this.h / 5,
      this.h / 2,
      this.h / 2,
      270,
      90,
    );


    image(this.gc_setup_im, 0, 0, this.w, this.h);
    pop();
  }
}

export default GCSetup;
