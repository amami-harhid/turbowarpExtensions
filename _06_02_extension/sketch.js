/**
 * P5JS Sketch
 * @param {*} p 
 */
const sketch = (p) => {

    p.setup = () => {
        alert('sketch setup');
    }

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

}

export {sketch};