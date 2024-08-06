const {Ball} = await import(`./ball.js?t=${new Date().getTime()}`);

let ball;
const mySetup = (p) => {
    console.log('test setup');
    let c = p.color(
        p.random(0,255),
        p.random(0,255),
        p.random(0,255),
    ); 
    ball = new Ball(0, 0, 20, -20, c);
}
const myDraw = (p) => {

    ball.W = p.canvas.clientWidth;
    ball.H = p.canvas.clientHeight;
    const _c = ball.c;
    p.fill(_c);
    p.noStroke();    
    p.ellipse( ball.x, ball.y, ball.r );
    ball.move();

}

export {mySetup, myDraw};