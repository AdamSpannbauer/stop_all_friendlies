class GCSetup {
  constructor(p, dir, h, on, gc_setup_im) {
    this.p = p;
    this.dir = dir;

    this.on = on;

    this.gc_setup_im = gc_setup_im;
    this.h = h;
    this.w = this.im_width();
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
