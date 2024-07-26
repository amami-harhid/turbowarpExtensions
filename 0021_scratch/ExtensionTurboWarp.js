/**
 * TurboWarp 拡張機能( 動きブロックの再現みたいなもの )
 */

((Scratch) => {
    // SVGデータをURIの形にしたもの
    // フリーSVGをダウンロードして色を赤に変えたあと、こちらで変換した（https://www.svgbackgrounds.com/tools/svg-to-css/）
    const GEAR_IMAGE_SVG_URI = `data:image/svg+xml,<svg version="1.1" id="_x31_0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="width: 256px; height: 256px; opacity: 1;" xml:space="preserve">
    <style type="text/css">.st0{fill:%23374149;}</style>
    <g>
    <path class="st0" d="M49.199,300.961c1.438,6.641,3.282,13.125,5.282,19.523c0.558,1.758,0.156,3.758-1.122,5.118l-32.961,34.242l27.84,48.32l46.242-11.359c1.839-0.485,3.758,0.156,5.038,1.438c4.481,5.039,9.199,9.758,14.238,14.32c1.442,1.282,2,3.203,1.52,5.039l-11.36,46.164l48.242,27.914l34.321-32.962c1.359-1.273,3.277-1.758,5.117-1.195c6.402,2.078,12.883,3.836,19.519,5.36c1.84,0.398,3.282,1.758,3.762,3.515L228.16,512h55.758l13.199-45.602c0.563-1.758,2.082-3.117,3.84-3.515c6.641-1.524,13.203-3.282,19.602-5.36c1.762-0.562,3.68-0.078,5.039,1.195l34.32,32.962l48.242-27.914l-11.359-46.164c-0.402-1.836,0.156-3.758,1.598-5.039c4.879-4.562,9.68-9.281,14.238-14.32c1.281-1.282,3.203-1.922,4.961-1.438l46.242,11.359l27.84-48.32l-32.879-34.242c-1.282-1.359-1.762-3.359-1.203-5.118c2.082-6.398,3.84-12.882,5.282-19.523c0.398-1.836,1.758-3.359,3.519-3.836L512,283.922v-55.836l-45.602-13.202c-1.762-0.485-3.121-2-3.519-3.758c-1.442-6.641-3.199-13.203-5.282-19.602c-0.558-1.758-0.078-3.758,1.203-5.125l32.879-34.234l-27.84-48.32l-46.242,11.359c-1.758,0.477-3.68-0.164-4.961-1.438c-4.558-5.047-9.359-9.766-14.238-14.32c-1.442-1.282-2-3.126-1.598-4.962l11.359-46.242L359.918,20.32l-34.32,32.962c-1.359,1.359-3.278,1.758-5.039,1.202c-6.398-2.086-12.961-3.843-19.602-5.281c-1.758-0.485-3.277-1.758-3.84-3.602L283.918,0H228.16l-13.281,45.602c-0.481,1.844-1.922,3.117-3.762,3.602c-6.636,1.438-13.117,3.195-19.519,5.281c-1.84,0.555-3.758,0.157-5.117-1.202L152.16,20.32l-48.242,27.922l11.36,46.242c0.48,1.836-0.078,3.68-1.52,4.962c-5.039,4.554-9.758,9.273-14.238,14.32c-1.281,1.274-3.199,1.914-5.038,1.438l-46.242-11.359l-27.84,48.32l32.961,34.234c1.278,1.367,1.68,3.367,1.122,5.125c-2,6.398-3.844,12.961-5.282,19.602c-0.398,1.758-1.68,3.274-3.519,3.758L0,228.086v55.836l45.68,13.203C47.519,297.602,48.801,299.125,49.199,300.961z M161.278,256c0-52.32,42.402-94.797,94.801-94.797c52.402,0,94.801,42.477,94.801,94.797c0,52.398-42.398,94.883-94.801,94.883C203.68,350.883,161.278,308.398,161.278,256z" style="fill: rgb(254, 0, 0);">
    </path>
    <path class="st0" d="M256,290.398c19.039,0,34.398-15.359,34.398-34.398c0-18.961-15.359-34.398-34.398-34.398c-18.961,0-34.402,15.438-34.402,34.398C221.598,275.039,237.039,290.398,256,290.398z" style="fill: rgb(254, 0, 0);">
    </path>
    </g>
    </svg>`;

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


