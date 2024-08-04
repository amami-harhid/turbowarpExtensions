const TestJSBase = class {
    constructor() {
        this.setupDone = false;
    }
    /**
     * setup処理
     * @param {*} p 
     * @param {*} args 
     * @param {*} util 
     */
    async setup(p, args, util) {
        // キャンバスを定義する（既存キャンバスをP5で利用）
        this.createResizeCanvas(p, util);
        // キャンバス変更を監視、変更時は resize処理をする
        const observer = new MutationObserver(() => {
            this.createResizeCanvas(p, util);
        });
        // Scratch3.xのキャンバスサイズ変更は、style属性の値が変化している
        // style属性の変化を監視する。
        const canvas = util.target.renderer.gl.canvas;
        observer.observe(canvas, {
            attriblutes: true,
            attributeFilter: ["style"], 
        });
        this.setupDone = true;
    }
    /**
     * P5のキャンバスを用意する
     * キャンバスのリサイズのときにも使う。
     * @param {*} p 
     * @param {*} util 
     */
    createResizeCanvas(p, util) {
        const canvas = util.target.renderer.gl.canvas;
        this.w = canvas.clientWidth;
        this.h = canvas.clientHeight;
        p.createCanvas(this.w, this.h, p.WEBGL, canvas);
    }

}
const TestJS = class extends TestJSBase {
    /**
     * setup処理
     * @param {*} p 
     * @param {*} args 
     * @param {*} util 
     */
    async setup(p, args, util) {
        super.setup(p, args, util);
        const h = p.canvas.clientHeight;
        // 初期位置 X軸=0, Y軸=高さ/2
        this.ball = new Ball(p, 0, -h/2+150, 100);
    }
    /**
     * draw処理
     * P5.drawメソッドの中から呼び出される前提である
     * @param {*} p 
     */
    draw(p) {
        const canvas = p.canvas;
        const w = canvas.clientWidth;
        this.ball.move( 0, 5); // <== 真下へ移動する
    }

}
/**
 * P5JSを使い ボールを描き、ボールを動かす。
 * 
 */
const Ball = class {
    constructor(p, x, y, radius) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.r = radius;
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        this._draw();
    }
    _draw() {
        const p = this.p;
        p.fill(p.color(255,255,255));
        p.noStroke();
        p.ellipse( this.x, this.y, this.r );
    }
}

export {TestJS};