const {Ball} = await import(`./ball.js?t=${new Date().getTime()}`);

let balls = [];
const mySetup = (p) => {
    console.log('test setup');
    const W =  p.canvas.clientWidth;
    new Array(20).fill(0).forEach(v =>{
        let c = p.color(
            p.random(0,255),
            p.random(0,255),
            p.random(0,255),
        ); 
        let d = p.random(0,50)+20;
        const ball = new Ball((p.random(0,W-20)-W/2), 0, d, p.random(0,5)-40, c);
        balls.push(ball);
    });
}
const myDraw = (p) => {

    for(const ball of balls){
        ball.W = p.canvas.clientWidth;
        ball.H = p.canvas.clientHeight;
        const _c = ball.c;
        p.fill(_c);
        p.noStroke();    
        p.ellipse( ball.x, ball.y, ball.r );
        ball.move();    
    }

}

export {mySetup, myDraw};