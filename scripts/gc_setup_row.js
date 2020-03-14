import GCSetup from './gc_setup.js';


function gc_setup_row(x, h, dir, on, gc_setup_im, world, engine) {
  const setups = [];
  const buffer = h * 1.3;

  for (let y = buffer; y < height - buffer; y += h * 0.7) {
    const gc_p = createVector(x, y);
    const gc_setup = new GCSetup(gc_p, dir, h, on, gc_setup_im, world, engine);

    setups.push(gc_setup);
  }

  return setups;
}

export default gc_setup_row;
