/**
 * 【sketch.js】
 * P5のsketchを定義する
 */
const TEST_URL = _extensionGlobals._EXTENSION_TEST_URL;
const {mySetup, myDraw} = await import(`${TEST_URL}/sub.js?t=${new Date().getTime()}`);

const sketch = (p) => {

    /**
     * setup処理
    */
    p.setup = async () => {
        mySetup(p);
    }
    /**
     * draw処理
     */
    p.draw = () => {
        myDraw(p);
    }
}

export {sketch};