// https://github.com/hi-oslab/hi-oslab.github.io/blob/main/js/canvas.js
const {Spring2D} = await import(`./Spring2D.js?t=${new Date().getTime()}`);

let o, s, l;
let gravity = 1.0;
let mass = 5.0;
const mySetup = (p) => {

    p.noStroke();
    o = new Spring2D(p, 0.0, width / 2, mass, gravity, 0, width);
    s = new Spring2D(p, 0.0, width / 2, mass, gravity, 1, width);
    l = new Spring2D(p, 0.0, width / 2, mass, gravity, 2, width);
}
const myWindowResized = (p) => {
    p.resizeCanvas(windowWidth, windowHeight);
    p.fill(255, 150);
    p.rect(0, 0, width, height);
  }
const myDraw = (p) => {
}

export {mySetup, myDraw};