/*
 *  Spring2D クラス
 */
const Spring2D = class {
    constructor(p, xpos, ypos, m, g, val, w){
        this.p = p;
        this.x = xpos;
        this.y = ypos;
        this.vx = 0;
        this.vy = 0;
        this.mass = m;
        this.gravity = g;
        this.radius = 0.0008 * w;
        this.stiffness = 0.2;
        this.damping = 0.7;
        this.val = val;
    }
    update(targetX, targetY) {
        let forceX = (targetX - this.x) * this.stiffness;
        let ax = forceX / this.mass;
        this.vx = this.damping * (this.vx + ax);
        this.x += this.vx;
        let forceY = (targetY - this.y) * this.stiffness;
        forceY += this.gravity;
        let ay = forceY / this.mass;
        this.vy = this.damping * (this.vy + ay);
        this.y += this.vy;    
    }
    display(nx, ny) {
        const p = this.p;
        if (this.val == 0) {
            p.noStroke();
            p.fill(0);
            p.push();
            p.translate(this.x - 128 * this.radius, this.y - 128 * this.radius);
            p.scale(this.radius);
            p.beginShape();
            // 1// /
            p.vertex(127.6, 259.6);
            p.bezierVertex(57.3, 259.6, 0.0, 202.3, 0.0, 131.9);
            p.bezierVertex(0.0, 61.5, 57.3, 4.3, 127.6, 4.3);
            p.bezierVertex(198.0, 4.3, 255.3, 61.5, 255.3, 131.9);
            p.bezierVertex(255.3, 202.3, 198.0, 259.6, 127.6, 259.6);
            // 1// /
            p.beginContour();
            p.vertex(127.6, 18.3);
            p.bezierVertex(65.0, 18.3, 14.0, 69.3, 14.0, 131.9);
            p.bezierVertex(14.0, 194.6, 65.0, 245.6, 127.6, 245.6);
            p.bezierVertex(190.3, 245.6, 241.3, 194.6, 241.3, 131.9);
            p.bezierVertex(241.3, 69.3, 190.3, 18.3, 127.6, 18.3);
            p.endContour();
            p.endShape();
            p.pop();
        } else if (this.val == 1) {
            p.push();
            p.translate(this.x - 128 * this.radius, this.y - 128 * this.radius);
            p.scale(this.radius);
            //control shape scale
            p.beginShape();
            // 1// /
            p.vertex(540.6, 254.7);
            p.vertex(246.5, 254.7);
            p.vertex(393.6, 0.0);
            p.vertex(540.6, 254.7);
            // 1// /
            p.beginContour();
            p.vertex(270.8, 240.7);
            p.vertex(516.4, 240.7);
            p.vertex(393.6, 28.0);
            p.vertex(270.8, 240.7);
            p.endContour();
            p.endShape();
            p.pop();
        } else if (this.val == 2) {
            p.push();
            p.translate(this.x - 128 * this.radius, this.y - 128 * this.radius);
            p.scale(this.radius);
      
            //control shape scale
            // 1/ 3rd Shape
            p.beginShape();
            // 1/// /
            p.vertex(791.8, 254.0);
            p.vertex(570.4, 254.0);
            p.vertex(570.4, 184.3);
            p.vertex(791.8, 184.3);
            p.vertex(791.8, 254.0);
            // 1/// /
            p.beginContour();
            p.vertex(584.4, 240.0);
            p.vertex(777.8, 240.0);
            p.vertex(777.8, 198.3);
            p.vertex(584.4, 198.3);
            p.vertex(584.4, 240.0);
            p.endContour();
            p.endShape();
      
            // 1/// 3rd Shape
            p.beginShape();
            // 1/// /
            p.vertex(791.8, 166.0);
            p.vertex(570.4, 166.0);
            p.vertex(570.4, 96.3);
            p.vertex(791.8, 96.3);
            p.vertex(791.8, 166.0);
            // 1/// /
            p.beginContour();
            p.vertex(584.4, 152.0);
            p.vertex(777.8, 152.0);
            p.vertex(777.8, 110.3);
            p.vertex(584.4, 110.3);
            p.vertex(584.4, 152.0);
            p.endContour();
            p.endShape();
      
            // 1// 3rd Shape
            p.beginShape();
            // 1/// /
            p.vertex(791.8, 78.1);
            p.vertex(570.4, 78.1);
            p.vertex(570.4, 8.3);
            p.vertex(791.8, 8.3);
            p.vertex(791.8, 78.1);
            // 1/// /
            p.beginContour();
            p.vertex(584.4, 64.1);
            p.vertex(777.8, 64.1);
            p.vertex(777.8, 22.3);
            p.vertex(584.4, 22.3);
            p.vertex(584.4, 64.1);
            p.endContour();
            p.endShape();
            p.pop();
        }
    }

}
export {Spring2D};