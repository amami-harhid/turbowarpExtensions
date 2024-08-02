/**
 * P5JSを使い 線を引く。
 * 線は p.frameCount をもとにして回転させる
 * 使いたい最低限のメソッドだけを用意している。ロード関係などは書いていない。
 * なお、P5JSで線を引くとき、Turbowarpの背景やスプライト描画は行われない（見えない）。
 * 
 * ※注目してほしい点
 * (1) ステージ(canvas要素)
 * util.target.renderer.gl.canvas でcanvas要素を取得している
 * 
 * (2) ステージのサイズ
 * canvas要素の clientWidth, clientHeight で見かけのサイズを取得している
 * 
 * (3) p.createCanvas()
 * サイズは 項 2) で取得したサイズを使う
 * 第３引数に (1) で取得する canvas要素を与えることで、canvas要素の新規作成を抑止する
 * 
 * (4) リサイズ処理
 * ステージの大きさが変わるとき、本処理内のリサイズ処理を行う
 * Scratch3.x(=Turbowarp)のステージの大きさは、Canvasのstyle属性で決まっているので
 * CanvasのStyle属性の変化を監視することにする。
 * 変更後のサイズを使い、p.createCanvas() を再実行する
 * 
 * (5) FPS値
 * Scratch3.x(=Turbowarp)のFPS値と P5JSのFPSを合わせておきたい。
 * つまり、P5のframeCountのカウントアップの間隔を Turbowarpの繰り返しブロックの
 * 繰返し間隔に合わせたい。
 * TurbowarpのFPS値は、util.target.runtime.frameLoop.framerate で取り出す
 */
const TestJS = class {
    /**
     * P5.setup メソッドを実行する
     * @param {*} p 
     * @param {*} args 
     * @param {*} util 
     */
    async setup(p, args, util) {
        // p5JSのFPSをScratch3.x(=Turbowarp)に合わせる
        p.frameRate(util.target.runtime.frameLoop.framerate);

        const canvas = util.target.renderer.gl.canvas;
        this.w = canvas.clientWidth;
        this.h = canvas.clientHeight;

        this.createResizeCanvas(p, util);

        // キャンバス変更を監視、変更時は resize処理をする
        const observer = new MutationObserver(() => {
            this.createResizeCanvas(p, util);
        });
        // Scratch3.xのキャンバスサイズ変更は、style属性の値が変化している
        // style属性の変化を監視する。
        observer.observe(canvas, {
            attriblutes: true,
            attributeFilter: ["style"], 
        });
    }
    /**
     * Scratchブロック P5JSDraw に対応するメソッドである。
     * 繰り返しブロックの中のブロックから呼び出すことを念頭においている。
     * このdraw()は p5のdrawメソッドとは異なるものであることに留意すること。
     * @param {*} p 
     * @param {*} args 
     * @param {*} util 
     */
    draw(p, args, util) {

        const halfWidth = this.w/2;
        const length = halfWidth * 0.5;

        const f = p.frameCount;
        const degree = f * 2;
        const radians = degree * Math.PI / 180;

        const dx = length * Math.cos(radians);
        const dy = length * Math.sin(radians);

        p.background( 200, 100, 100, 50 );
        p.stroke( 255 );
        p.line( -dx, -dy, dx, dy );

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
export {TestJS};