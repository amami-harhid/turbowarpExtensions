/**
 * P5JSを使い ボール（円）を描き、等速落下させる。
 * 下に着地したら跳ね返る。
 * 
 */
const Scetch = class {
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
        p.background( 255, 255, 255 );
        // 線の色
        p.stroke( 0, 0, 0 );
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
        const canvas = util.target.renderer.gl.canvas;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        p.createCanvas(w, h, p.WEBGL, canvas);
    }

}
export {Scetch};