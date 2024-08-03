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
 * (6) P5.noLoop()
 * P5の noLoopメソッドを実行すると、P5.draw メソッドは実行されません。
 * 一方、P5._draw メソッドは 
 * 
 * 
 * 
 */
const TestJS = class {
    /**
     * setup処理
     * @param {*} p 
     * @param {*} args 
     * @param {*} util 
     */
    async setup(p, args, util) {
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
    }
    /**
     * draw処理
     * P5.drawメソッドの中から呼び出される前提である
     * @param {*} p 
     */
    draw(p) {
        const canvas = p.canvas;
        const w = canvas.clientWidth;
        const halfWidth = w / 2;
        const length = halfWidth * 0.5;
        const f = p.frameCount;
        const degree = f * 2;
        const radians = degree * Math.PI / 180;

        const dx = length * Math.cos(radians);
        const dy = length * Math.sin(radians);

        // 背景の色
        p.background( 150, 150, 150 );
        // 線の色
        p.stroke( 255, 255, 255 );
        // 線の太さ
        p.strokeWeight(1);
        p.line( -dx, -dy, dx, dy );
        p.line( -length, 0, length, 0 );

    }
    /**
     * P5のキャンバスを用意する
     * キャンバスのリサイズのときにも使う。
     * @param {*} p 
     * @param {*} util 
     */
    createResizeCanvas(p, util) {
        const gl = util.target.renderer.gl;
        const canvas = util.target.renderer.gl.canvas;
        this.w = canvas.clientWidth;
        this.h = canvas.clientHeight;
        p.createCanvas(this.w, this.h, p.WEBGL, canvas);
    }

}
export {TestJS};