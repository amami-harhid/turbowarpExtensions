/**
 * TurboWarp 拡張機能( 動きブロックの再現みたいなもの )
 */

((Scratch) => {
    const GEAR_IMAGE_SVG_URI = 'https://amami-harhid.github.io/turbowarpExtensions/assets/gear.svg';

    // 右回転画像（ScratchやTurbowarpの中にあるものを参照する）
    const BLOCK_MEDIA_ROTATE_RIGHT_IMG = "/static/blocks-media/default/rotate-right.svg";

    const TEST_URL = "http://127.0.0.1:5500/turbowarpGithub/turbowarpExtensions/0021_scratch";

    class MotionMyExtensions {
        getInfo(){
            return {
                id: "MotionMyExtensions0021",   // 拡張機能のID(重複不可)
                name: "ExMotion0021",   // 表示文字列
                color1: "#2222ff",  // ブロックの色( 青っぽい色にする )
                color2: "#ffffff",  // ブロック分類の〇の周囲の色
                blocks: [
                    {
                        opcode: "loadJSFileSetting",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "[IMG_GEAR]JSファイルを指定する[JSURL]",
                        arguments: {
                            IMG_GEAR: {
                                type: Scratch.ArgumentType.IMAGE,       //タイプ
                                dataURI: GEAR_IMAGE_SVG_URI,            //歯車画像のURI
                            },
                            JSURL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: `${TEST_URL}/sub.js`,
                            },
                        },
                    },
                    {
                        opcode: "setup",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "[IMG_GEAR]事前準備",
                        arguments: {
                            IMG_GEAR: {
                                type: Scratch.ArgumentType.IMAGE,       //タイプ
                                dataURI: GEAR_IMAGE_SVG_URI,            //歯車画像のURI
                            },
                        },
                    },
                    {
                        opcode: "rotateAndMove",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "[IMG_ROTATE_RIGHT][DEGREES]度回して[STEPS]歩動かす",
                        arguments: {
                            IMG_ROTATE_RIGHT: {
                                type: Scratch.ArgumentType.IMAGE,       //画像タイプ
                                dataURI: BLOCK_MEDIA_ROTATE_RIGHT_IMG,  //右回転の画像のURI( "⤾" )
                            },
                            DEGREES: {
                                // 角度を指定する
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 0,
                            },
                            STEPS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10,
                            },
                        },
                    },
                ],
            }
        }
        loadJSFileSetting( args, util ){
            this.jsUrl = args.JSURL;            

        }
        async setup( args, util ){
            try{
                const sub = await import(`${this.jsUrl}`+ '?_t=' + new Date().getTime());
                this.testJs = new sub.TestJs(); // 読み込むJSは export {TestJs} をしている前提。
            }catch(e){
                console.error( '読み込みに失敗した、もしくはクラス定義が存在しないみたいです', e )
            }
        }
        async rotateAndMove( args, util ) {
            if(this.testJs){
                await this.testJs.rotateAndMove( args, util );
            }
        }
    }

    Scratch.extensions.register(new MotionMyExtensions());

})(Scratch);


