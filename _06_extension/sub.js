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
 * ステージの大きさが変わるとき、本処理内のリサイズ処理を行っていない！
 * 
 * (5) P5.noLoop()
 * P5の noLoopメソッドを実行しておくと、P5.draw メソッドの繰り返し実行が抑止される。
 * Extension.js内で p5.drawメソッドを定義しているが、
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
    setup(p, args, util) {
        const canvas = util.target.renderer.gl.canvas;
        this.w = canvas.clientWidth;
        this.h = canvas.clientHeight;
        p.createCanvas(this.w, this.h, p.WEBGL, canvas);
    }
    /**
     * draw処理
     * P5.drawメソッドの中から呼び出される前提である
     * @param {*} p 
     */
    draw(p) {
        const w = p.canvas.clientWidth;
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
}

export {TestJS};