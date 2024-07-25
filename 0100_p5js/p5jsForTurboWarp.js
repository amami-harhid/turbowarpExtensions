/**
 * TurboWarp 拡張機能( p5Js )
 */
const P5JSLIB = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.js";
((Scratch) => {
    const HOST = "http://127.0.0.1:5500";
    class P5Js { 
        getInfo(){
            return {
                id: "P5JS20100",
                name: Scratch.translate("P5JS"),
                color1: "#000000", // ブロックの色
                color2: "#ff0000", // ブロック分類の〇の周囲の色
                blocks: [
                    {
                        opcode: "p5jsInitialize",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "p5jsInitialize [host]/[path]",
                        arguments: {
                            host: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: HOST, // MS-CODE, LiveServer(=> Go Live)
                            },
                            path: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "0100_p5js/sub01.js", // 拡張機能内で読み込むJavascript
                            },
                        },
                    },
                    {
                        opcode: "p5jsSetup",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "p5jsSetup",
                    },
                    {
                        opcode: 'p5JsBackground',
                        blockType: Scratch.BlockType.COMMAND,
                        text: "p5JsBackground [COLOR]",
                        arguments: {
                            COLOR: {
                                type: Scratch.ArgumentType.COLOR,
                                defaultValue: "#000000",
                            },
                        },
                    },
                    {
                        opcode: "p5JsDraw",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "p5JsDraw",
                    },
                ],
            }
        }
        async p5jsInitialize(args, util ) {
            let host = args.host;
            if(host.length == 0) {
                host = HOST;
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
                        // p5js で自動的に setupを実行しないようにする
                        //_this.setup(args, util);
                    };
                }
                const _myp5 = new p5(s);
                this.myp5 = _myp5;

            }catch(e){
                console.error(e);
            }
        }

        async p5jsSetup(args, util ) {
            await this.testJs.setup(this.p5, args, util);
        }
        async p5JsBackground(args,util){
            this.testJs.background(this.p5, args, util);
        }
        async p5JsDraw(args, util) {
            await this.testJs.draw(this.p5, args,util);
        }

    }
    
    Scratch.extensions.register(new P5Js());

})(Scratch);
