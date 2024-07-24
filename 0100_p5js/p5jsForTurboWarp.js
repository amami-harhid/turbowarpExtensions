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
                        text: Scratch.translate("setup [host],[path]"),
                        arguments: {
                            host: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "http://127.0.0.1:5500",
                            },
                            path: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "/sub.js",
                            },
                        },
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
            let host = args.host;
            if(host.length == 0) {
                host = 'http://127.0.0.1:5500';
            }
            let path = args.path;
            if(path.length>0 && path[0] != '/') {
                path = `/${path}`;
            }
            try{
                await import(P5JSLIB+ '?date=' + new Date().getTime());
                const sub = await import(`${host}${path}`+ '?date=' + new Date().getTime());
                this.testJs = new sub.TestJs();
                const _this = this;
                const s = (p) => {
                    p.setup = () => {
                        _this.p5 = p;
                        _this.setup(args, util);
                    };
                }
                const _myp5 = new p5(s);
                this.myp5 = _myp5;

            }catch(e){
                console.error(e);
            }
        }

        async setup(args, util ) {
            await this.testJs.setup(this.p5, args, util);
        }
        async background(args,util){
            this.testJs.background(this.p5, args,util);
        }
        async draw(args, util) {
            await this.testJs.draw(this.p5, args,util);
        }

    }
    Scratch.extensions.register(new P5Js());

})(Scratch);
