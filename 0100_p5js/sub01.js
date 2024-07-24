const TestJs = class {

//【Step15】
//
//  自由落下 する Ball-Functionを作り インスタンスとして利用
//  5個のインスタンスを配列に格納し、配列を繰り返しで利用する
//
    constructor() {
        this.W = window.innerWidth;
        this.H = window.innerHeight; 
        this.ball = null;
    }
    async setup(p, args, util) {
        this.r = p.random(255)*0.5;
        this.g = p.random(255)*0.5;
        this.b = p.random(255)*0.5;
        const gl = util.target.renderer.gl;
        const canvas = gl.canvas;
        this.W = canvas.width;
        this.H = canvas.height;
        p.createCanvas( this.W, this.H, p.WEBGL, canvas); 
        this.balls = []
        new Array(10).fill(0).forEach(v =>{
            let c = p.color(
                p.random(0,255),
                p.random(0,255),
                p.random(0,255),
            ); 
            const d = p.random(200)+20;
            // Ball の x座標(初期値): 半径の分をずらすことで キャンバスの中に描画させる
            // キャンバスの外に位置づけると左右の動きがおかしくなるための微調整です。
            const x = p.random(this.W/3)+d/2;
            const ball = new Ball(x, 0, d, -(p.random(100)+30), c);
            this.balls.push(ball);
            ball.W = this.W;
            ball.H = this.H    
        });
    }
  
    async draw(p, args, util) {
        p.background( this.r, this.g, this.b);
        for(let ball of this.balls){
            const _c = ball.c;
            p.fill(_c);
            p.noStroke();    
            p.ellipse( ball.x, ball.y, ball.r );
            ball.move();
        }
    }

}
export {TestJs};

/*
 *  Ball Function
 */
const Ball = class {
    constructor(x, y, r, power, c){
        this._x = x;
        this._y = y;
        this._r = r;
        this._c = c;
        this._directionX = 1;
        this._power = power;
        this._speed = this._power;    
    }
    get c() {
        return this._c;
    }
    get W(){
        return this._W;
    }
    set W(_W){
        this._W = _W;
    }
    get H() {
        return this._H;
    }
    set H(_H){
        this._H = _H;
    }
    // X方向の動き
    moveX () {
        this._x += this._directionX * 10;
        if( (this.x-this._r/2) < -this.W/2 || this.W/2 < (this.x +this._r/2)) {
            this._directionX *= -1;
        }
    }
    // Y方向の動き
    moveY () {
        this._y += this._speed;
        this._speed += 5;
        if( (this.y+this._r/2) > this.H/2 ) {
            this._speed = this._power;
        }
    };
    // 動きをまとめる
    move () {
        this.moveX();
        this.moveY();
    }
    get x() {
        return this._x - this.W/2;
    }
    get y() {
        return this._y + this.H/2;
    }
    get r() {
        return this._r;
    }
}
  