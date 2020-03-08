class SpeechBubble {
  constructor(msg, mouth_p, dir, font, size, col) {
    this.msg = msg;

    this.mouth_p = mouth_p;
    this.dir = dir;

    this.font = font || font_8_bit;
    this.size = size || 10;
    this.color = col || 150;
  }

  draw() {
  	push();
  	translate(this.mouth_p.x, this.mouth_p.y);

  	stroke(0);
  	strokeWeight(3);
  	fill(this.color);
  	textFont(this.font);
  	textSize(this.size);

  	if (this.dir < 0) {
  		textAlign(RIGHT);
  	} else {
  		textAlign(LEFT);
  	}

  	text(this.msg, 0, 0);
  	pop();
  }
}
