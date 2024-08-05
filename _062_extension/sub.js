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
 * CanvasのStyle属性の変化はMutationObserverを使って監視する。
 * 変更を検知したときは、p.createCanvas() を再実行することにしている。
 * 
 * (5) P5.noLoop()
 * P5.setupの中で、P5.noLoopメソッドを実行しておくと、P5.draw メソッドの繰り返し実行が抑止される。
 * (P5.setupが終わったあとに P5.drawが１回だけ実行され、以降は繰り返し実行は行われない)。
 * Extension.js内で p5.drawメソッドを定義しているが、実行のタイミングは
 * Scratch3.x(=Turbowarp)側の「繰り返しブロック」が繰り返すタイミングにあわせる。
 * つまりP5のDrawのFPSは、Scratch3.x(=Turbowarp)側のFPS値に依存することになる。
 * 
 * (6) TestJS.draw の実行の方法
 * Block(p5JsDraw)を実行すると次が連鎖的に発生する仕組みである。
 * ・p5._draw()の実行
 * ・p5.redraw()の実行(p5._drawの中から呼び出す)
 * ・p5.draw()の実行(p5.redrawの中から呼び出す)
 * ・TestJS.draw()の実行(p5.drawの中から呼び出す)
 * この仕組みとすることで、P5のレンダリング処理に影響を与えることなく、TestJS.drawを
 * 実行することができる（はず）。
 * 
 * 
 */

const sketch = (gl) => {

    return (p) => {

        /**
         * P5のキャンバスを用意する
         * キャンバスのリサイズのときに使う。
         * @param {*} p 
         * @param {*} gl 
         */
        const _createCanvas = (p, gl) => {
            const canvas = gl.canvas;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            p.createCanvas(w, h, p.WEBGL, canvas);
        }
        /**
         * setup処理
        */
        p.setup = async () => {
            //extension.p5 = p;
            console.log('sketch p=', p);
            // キャンバスを定義する（既存キャンバスをP5で利用）
            _createCanvas(p, gl);
            p.noLoop();

            // キャンバス変更を監視、変更時は resize処理をする
            const observer = new MutationObserver(() => {
                createResizeCanvas(p, gl);
            });
            // Scratch3.xのキャンバスサイズ変更は、style属性の値が変化している
            // style属性の変化を監視する。
            const canvas = gl.canvas;
            observer.observe(canvas, {
                attriblutes: true,
                attributeFilter: ["style"], 
            });
        }
        /**
         * draw処理
         */
        p.draw = () => {

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
    };

}


export {sketch};