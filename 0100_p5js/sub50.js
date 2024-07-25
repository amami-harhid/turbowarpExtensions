const TestJs = class {
    constructor() {
        this.rgb = {r:0, g:0, b:0};
        this.canvasSize = {W:0, H:0};        
    }
    resizeCanvasIfChanged(p, util){
        const gl = util.target.renderer.gl;
        const canvas = gl.canvas;
        if(canvas.width != this.canvasSize.W) {
            p.createCanvas(canvas.width, canvas.height, p.WEBGL, canvas);
            this.canvasSize = {W: canvas.width, H:canvas.height};
        }
    }
    async setup(p, args, util) {
        const gl = util.target.renderer.gl;
        const canvas = gl.canvas;
        this.canvasSize = {W: canvas.width, H:canvas.height};
        p.createCanvas( canvas.width, canvas.height, p.WEBGL, canvas);
        this.balls = []
        new Array(10).fill(0).forEach(v =>{
            let c = p.color(
                p.random(0,255),
                p.random(0,255),
                p.random(0,255),
            ); 
            const d = p.random(200)+10;
            // Ball の x座標(初期値): 半径の分をずらすことで キャンバスの中に描画させる
            // キャンバスの外に位置づけると左右の動きがおかしくなるための微調整です。
            const x = p.random(canvas.width/3)+d/2;
            const ball = new Ball(x, 0, d, -(p.random(100)+50), c);
            this.balls.push(ball);
            ball.W = canvas.width;
            ball.H = canvas.height;
        });
        // 径の順に並べ替える(径の昇順)
        this.balls.sort((a,b)=>{
            return a._r - b._r;
        })
    }
    async background(p, args, util) {
        let rgb;
        if( args.COLOR ){
            rgb = Scratch.Cast.toRgbColorObject(args.COLOR);
        }else{
            rgb = Scratch.Cast.toRgbColorObject("#000000")
        }
        console.log(rgb)
        p.background( rgb.r, rgb.g, rgb.b);
        this.rgb = rgb;
    }
    async draw(p, args, util) {
        this.resizeCanvasIfChanged(p, util);
        p.background( this.rgb.r, this.rgb.g, this.rgb.b);
        this.balls.forEach(ball=>{
            ball.W = this.canvasSize.W;
            ball.H = this.canvasSize.H;
            const _c = ball.c;
            p.fill(_c);
            p.noStroke();    
            p.ellipse( ball.x, ball.y, ball.r );
            ball.move();
        });
    }

}
export {TestJs};

/*
 *  Ball クラス
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
        this._counter = 0;
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
        // 径の大きい円は減速が速いとする
        this._speed +=(this._r) / 25;
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
  