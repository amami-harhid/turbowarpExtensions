/**
 * TurboWarp 拡張機能( Test )
 * Draw line Test
 * 
 * background 単体 --> うまくいく（透明度を除く）
 * drawLine 単体 --> うまくいく
 * 
 * background -> drawLine と連続すると、背景が黒になる。なぜ？？--> うまくいっている。gl.clear()の問題の様子
 * 
 * 
 * これを見て研究せよ
 * https://stackoverflow.com/questions/30300907/webgl-glsl-how-to-set-background-color-of-embedded-x-shader-x-fragment
 */
((Scratch) => {

    class HarhidJSExecutor {
        constructor(){
            this.twgl = null;
            this.gl = null;
            this.color = null;
            this.programInfoMap = new Map();
            this.bufferInfoMap = new Map();

        }
        getInfo(){
            return {
                id: "TestHarhid5",
                name: Scratch.translate("Test5"),
                blocks: [
                    {
                        opcode: "testerInit",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("準備"),
                    },
                    {
                        opcode: "execute",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("実行する"),
                    },
                    {
                        opcode: 'background',
                        blockType: Scratch.BlockType.COMMAND,
                        text: "background to [COLOR] ",
                        arguments: {
                            COLOR: {
                                type: Scratch.ArgumentType.COLOR,
                                defaultValue: "#000000",
                            },
                        },
                    },
                    {
                        opcode: "methodByName",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("メソッド[methodName]を実行する"),
                        arguments: {
                            methodName: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "",
                            },
                        },
                    },
                ],
            }
        }
        async testerInit(args, util ) {
            const sub = await import('http://127.0.0.1:5500/0201_twglMod/sub.js'+ '?date=' + new Date().getTime());
            this.testJs = new sub.TestJS(args, util);
        }
        async execute(args, util ) {
            console.log('main execute start')
            //const _exe = this.testJs.executor.bind(this, args, util);
            //_exe();
            await this.testJs.setting(args, util);
            console.log('main execute end')
        }
        background(args,util){
            this.testJs.background(args,util);
        }
        async methodByName(args, util) {
            const methodName = args.methodName;
            const method = this.testJs[methodName];
            if( method && typeof method == 'function'){
                const _m = method.bind(this.testJs, {}, util);
                await _m();
            }
        }

    }
    Scratch.extensions.register(new HarhidJSExecutor());

})(Scratch);
