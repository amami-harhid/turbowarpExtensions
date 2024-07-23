/**
 * TurboWarp 拡張機能( p5Js )
 */
const P5JSLIB = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.js";
((Scratch) => {

    class P5Js {
 
        getInfo(){
            return {
                id: "P5JS",
                name: Scratch.translate("P5JS"),
                blocks: [
                    {
                        opcode: "p5jsInitialize",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("準備"),
                    },
                    {
                        opcode: "setup",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("SETUP"),
                    },
                    {
                        opcode: 'backup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("background"),
                        arguments: {
                            COLOR: {
                                type: Scratch.ArgumentType.COLOR,
                                defaultValue: "#000000",
                            },
                        },
                    },
                    {
                        opcode: "draw",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("draw"),
                    },
                ],
            }
        }
        async p5jsInitialize(args, util ) {
            await import(P5JSLIB+ '?date=' + new Date().getTime());
            //console.log(p5);
            const sub = await import('https://amami-harhid.github.io/turbowarpExtensions/0100_p5js/sub.js'+ '?date=' + new Date().getTime());
            //console.log(sub.TestJs);
            this.testJs = new sub.TestJs();
            const _this = this;
            const s = (p) => {
                //this.__p5 = p;
                p.setup = () => {
                    _this.__p5 = p;
                    _this.setup(args, util);
                };
            }
            const _myp5 = new p5(s);
            this.myp5 = _myp5;
        }

        async setup(args, util ) {
            console.log('setup start')
            await this.testJs.setup(this.__p5, args, util);
            console.log('main execute end')
        }
        async background(args,util){
            this.testJs.background(this.__p5, args,util);
        }
        async draw(args, util) {
            await this.testJs.draw(this.__p5, args,util);
        }

    }
    Scratch.extensions.register(new P5Js());

})(Scratch);
