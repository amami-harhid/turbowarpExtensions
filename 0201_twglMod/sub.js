const SUB = {};
class Color {
    static hexToRgb (hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    static decimalToRgb (decimal) {
        const a = (decimal >> 24) & 0xFF;
        const r = (decimal >> 16) & 0xFF;
        const g = (decimal >> 8) & 0xFF;
        const b = decimal & 0xFF;
        return {r: r, g: g, b: b, a: a > 0 ? a : 255};
    }
}
class Cast {
    static toNumber (value) {
        if (typeof value === 'number') {
            if (Number.isNaN(value)) {
                return 0;
            }
            return value;
        }
        const n = Number(value);
        if (Number.isNaN(n)) {
            return 0;
        }
        return n;
    }
    static toRgbColorObject (value) {
        let color;
        if (typeof value === 'string' && value.substring(0, 1) === '#') {
            color = Color.hexToRgb(value);
            if (!color) color = {r: 0, g: 0, b: 0, a: 255};
        }else{
            color = Color.decimalToRgb(Cast.toNumber(value));
        }
        return color;
    }
    static rgbToHsv() {

    }
}
const test = {
    background: async function(args, util) {
        console.log("this=", this);


    }
}
const Liner = class {

    constructor(util, twgl){
        this._positions = [];
        this._gl = util.target.renderer.gl;
        this._twgl = twgl;
    }
    makeProgramInfo(vs, fs) {
        this._programInfo = this._twgl.createProgramInfo(this._gl, [vs, fs]);
    }
    makeBufferInfo( attributes ) {
        this._bufferInfo = this._twgl.createBufferInfoFromArrays(
            this._gl,
            attributes,
        );
    }
    makeUniform(uniform) {
        this._uniform = {};
        for(let k in uniform){
            const v = uniform[k];
            this._uniform[k] = v;
        }
    }
    get programInfo() {
        return this._programInfo;
    }
    get bufferInfo() {
        return this._bufferInfo;
    }
    get objectToDraw() {
        return {
            type: this._gl.LINES,
            programInfo: this._programInfo,
            bufferInfo:  this._bufferInfo,
            uniforms: this._uniform,
        };
    }

}
const TestJS = class {

    async setting( args, util ) {
        console.log('executor start')
        this.time = 0;
        this.time2 = 0;
        TestJS.twgl = await import('https://twgljs.org/dist/5.x/twgl-full.module.js');
        this.util = util;
        await this.drawSetting({x:0, y:0, length: 0.5}, this.util);
        console.log('executor end');
    }
    async background (args, util) {
        let rgb;
        if( args.COLOR ){
            rgb = Cast.toRgbColorObject(args.COLOR);
        }else{
            rgb = Cast.toRgbColorObject("#000000")
        }
        // Scratch3 Rendererより コンテキスト（gl)を取り出す。
        const gl = util.target.renderer.gl;
        TestJS.twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(rgb.r/255, rgb.g/255, rgb.b/255, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
//        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    async drawSetting(args, util) {
        // Scratch3 Rendererより コンテキスト（gl)を取り出す。
        const gl = util.target.renderer.gl;
        this.liners = [];
        {
            const liner = new Liner(util, TestJS.twgl);
            liner.makeProgramInfo(vs, fs);
            liner.makeBufferInfo({position: [0,0,0, 0,args.length,0]});
            this.liners.push(liner);
        }
        {
            const liner = new Liner(util, TestJS.twgl);
            liner.makeProgramInfo(vs, fs);
            liner.makeBufferInfo({position: [0,0,0, 0,args.length,0]});
            this.liners.push(liner);
        }
        {
            const liner = new Liner(util, TestJS.twgl);
            liner.makeProgramInfo(vs, fs);
            liner.makeBufferInfo({position: [0,0,0, 0,args.length*0.8,0]});
            this.liners.push(liner);
        }
    }
    async myRender(args, util) {
        this.time += 1;
        const gl = util.target.renderer.gl;
        const degree = this.time * 2;
        //this.background( { COLOR : "#505050" }, util );
        {
            const line = this.liners[0];
            line.makeUniform(
                {
                    u_degree:  -degree,
                    u_color :  [ 0, 1, 1, 1 ],
                    u_offset : [ 0.1, 0, 0 ],
                }
            );
        }
        {
            const line = this.liners[1];
            line.makeUniform(
                {
                    u_degree:  degree,
                    u_color :  [ 1, 0, 0, 1 ],
                    u_offset : [ 0, 0, 0 ],
                }
            );
        }
        {
            const line = this.liners[2];
            line.makeUniform(
                {
                    u_degree:  degree*10,
                    u_color :  [ 1, 1, 1, 1 ],
                    u_offset : [ -0.2, 0, 0 ],
                }
            );
        }

        const objectsToDraw = [];
        this.liners.forEach(v=>{
            objectsToDraw.push(v.objectToDraw);

        });
        TestJS.twgl.drawObjectList( gl, objectsToDraw );
    }
}



const vs = `
attribute vec3 position;
uniform vec3 u_offset;
uniform float u_degree;
uniform vec4 u_color;
varying vec4 v_color;
#define PI 3.14159
void main(void){
    float angleInRadians = u_degree * PI / 180.0;
    vec2 rotate = vec2(sin(angleInRadians), cos(angleInRadians));
    vec2 rotatedPosition = vec2(
        (position.x) * rotate.y + u_offset.x + (position.y) * rotate.x +u_offset.y,
        (position.y) * rotate.y +u_offset.y - (position.x) * rotate.x +u_offset.x
    );
    gl_Position = vec4(rotatedPosition,0,1);
    v_color = u_color;
}
    `;
    const fs = `
precision mediump float;
varying vec4 v_color;
void main(void){
//    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    gl_FragColor = v_color;
}
    `;

    const vs2 = `
    attribute vec3 position;
    uniform float u_degree;
    uniform vec4 u_color;
    varying vec4 v_color;
    #define PI 3.14159
    void main(void){
        float angleInRadians = u_degree * PI / 180.0;
        vec2 rotate = vec2(sin(angleInRadians), cos(angleInRadians));
        vec2 rotatedPosition = vec2(
            position.x * rotate.y + position.y * rotate.x,
            position.y * rotate.y - position.x * rotate.x
        );
        gl_Position = vec4(rotatedPosition,0,1);
        v_color = u_color;
        //gl_Position = vec4(position,1.0);
    }
        `;
        const fs2 = `
    precision mediump float;
    varying vec4 v_color;
    void main(void){
    //    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        gl_FragColor = v_color;
    }
        `;
export {TestJS};