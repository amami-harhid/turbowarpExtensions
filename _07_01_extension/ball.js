/*
 *  Ball クラス
 */
const Ball = class {
    constructor(x, y, r, power, c){
        this._x = x;
        this._y = y;
        this._r = r;
        this._c = c;
        this._directionX = 1;
        this._power = power;
        this._speed = this._power;
        this._counter = 0;
    }
    get c() {
        return this._c;
    }
    get W(){
        return this._W;
    }
    set W(_W){
        this._W = _W;
    }
    get H() {
        return this._H;
    }
    set H(_H){
        this._H = _H;
    }
    // X方向の動き
    moveX () {
        this._x += this._directionX * 10;
        if( (this.x-this._r/2) < -this.W/2 || this.W/2 < (this.x +this._r/2)) {
            this._directionX *= -1;
        }
    }
    // Y方向の動き
    moveY () {
        this._y += this._speed;
        // 径の大きい円は減速が速いとする
        this._speed +=(this._r) / 25;
        if( (this.y+this._r/2) > this.H/2 ) {
            this._speed = this._power;
        }
    };
    // 動きをまとめる
    move () {
        this.moveX();
        this.moveY();
    }
    get x() {
        return this._x - this.W/2;
    }
    get y() {
        return this._y + this.H/2;
    }
    get r() {
        return this._r;
    }
}
export {Ball};