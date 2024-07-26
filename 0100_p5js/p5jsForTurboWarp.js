/**
 * TurboWarp 拡張機能( p5Js )
 */

((Scratch) => {
    // P5JS CDN
    const P5JSLIB = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.js";
    // MS-CODE, LiveServer(=> Go Live)
    const TEST_URL = "http://127.0.0.1:5500/turbowarpGithub/turbowarpExtensions/0100_p5js/";
    class P5JsSupportor { 
        getInfo(){
            return {
                id: "P5JS0100",
                name: "P5JS",
                color1: "#000000", // ブロックの色
                color2: "#ff0000", // ブロック分類の〇の周囲の色
                blocks: [
                    {
                        opcode: "p5jsInitialize",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "p5jsInitialize [SUBURL]",
                        arguments: {
                            SUBURL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: `${TEST_URL}/sub.js`,   // MS-CODE, LiveServer(=> Go Live)
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
            try{
                // P5JS LIB を読み込む
                await import(P5JSLIB+ '?date=' + new Date().getTime());
                let subUrl = args.SUBURL;
                // SUB JS を読み込む(キャッシュからの読み込みをしない)
                const _t = new Date().getTime();
                const sub = await import(`${subUrl}?_t=${_t}`);
                this.testJs = new sub.TestJs(); // SUB JS のクラスをインスタンス化
                const _this = this; // ※1 で使うために退避する
                // P5JS インスタンスモード
                const s = (p5) => {
                    p5.setup = () => {
                        _this.p5 = p5; // (※1) p オブジェクトを退避する
                        // p5js で自動的に setupを実行しないようにする。
                        // setup() は Scratchブロック経由としたいため。
                        //_this.setup(args, util);
                    };
                }
                const _ = new p5(s);
                //this.myp5 = _myp5;

            }catch(e){
                console.error(e);
            }
        }

        async p5jsSetup( args, util ) {
            await this.testJs.setup( this.p5, args, util);
        }

        async p5JsBackground( args,util){
            this.testJs.background( this.p5, args, util);
        }

        async p5JsDraw( args, util) {
            await this.testJs.draw( this.p5, args,util);
        }

    }
    
    Scratch.extensions.register(new P5JsSupportor());

})(Scratch);
