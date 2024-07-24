const TestJs = class {

    constructor(){

        this.n = 200;
        this.maxR = 195;
        this.minR = 5;
    
    }
    async setup(p, args, util) {
        const gl = util.target.renderer.gl;
        const canvas = gl.canvas;
        this.w = canvas.width;
        this.h = canvas.height;

        p.createCanvas(this.w, this.h, p.WEBGL, canvas);
        p.blendMode(p.SCREEN);
    }
    
    async draw(p, args, util) {
        p.noLoop();
        p.stroke(255, 50);
        p.stroke(255, 50);
        for(let x = -this.w * 10; x < 11 * this.w; x+= 100){
            p.line(x, this.h, 0, -this.h * 0.5 );
        }
        p.noStroke();
        for(let i = 0; i < this.n; i++){
            this.drawParticle(p, i);
        }
      }
    
    drawParticle(p, i){
        let r = i / ( this.n / (this.maxR - this.minR)) + this.minR;
        let x = p.random( this.w ) * 2 - this.w;
        let _y = p.pow((this.h / this.n) * i, 2) / this.h; // pow(a, 3) ==> a * a * a
        let y = _y *2 - this.h/2;
        var cr = p.random([[3,0,3], [0,3,3], [3,3,0], [0,0,0]]);
        for(let j = 0; j < r; j++ ){
            var alph = p.pow(j, 6) * 255 / p.pow(r, 6);
            p.fill(p.color(255 - j * cr[0], 255 - j * cr[1], 255 - j * cr[2], alph*0.2));
            var d = r - j;
            p.ellipse( x,  y,  d);
        }
    }
}
export {TestJs};