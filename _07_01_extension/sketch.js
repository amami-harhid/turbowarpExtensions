/**
 * Ballクラスをインポート
 * 同じ階層にあるファイルなので、(./～)の書き方でOK。
 * await を忘れてはだめです。
 */
const {mySetup, myDraw} = await import(`./sub.js?_t=${new Date().getTime()}`);

/**
 * P5JS Sketch
 * @param {*} p 
 */
const sketch = (p) => {

    let ball;

    p.setup = () => {

        mySetup(p);

    }

    p.draw = () => {

        myDraw(p);

    }

}

export {sketch};