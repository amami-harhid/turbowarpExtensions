/**
 * P5JS Sketch
 * @param {*} p 
 */
const sketch = (p) => {

    p.setup = () => {
        alert('sketch setup');
    }

    p.draw = () => {

        // 背景の色
        p.background( 150, 150, 150 );

    }

}

export {sketch};