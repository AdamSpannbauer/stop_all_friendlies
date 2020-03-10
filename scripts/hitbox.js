const { Engine } = Matter;
const { Bodies } = Matter;
const { Constraint } = Matter;

class HitBox {
  constructor(p, w, h, world, engine, options) {
    this.p = p;
    this.w = w;
    this.h = h;

    this.body = Bodies.rectangle(this.p.x, this.p.y, w, h, options);
    world.add(engine.world, this.body);
  }

  set_p(p) {
    this.body.position.x = p.x;
    this.body.position.y = p.y;

    this.p.x = p.x;
    this.p.y = p.y;
  }

  draw() {
    push();
    translate(this.body.position.x, this.body.position.y);
    fill(255, 0, 0);
    noStroke();
    rect(0, 0, this.w, this.h);
    pop();
  }
}

export default HitBox;
