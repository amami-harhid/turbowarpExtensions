/**
 * Turbowarpの『カスタム拡張機能』を使おう【３】
 * 外部JSに書いた処理を実行するサンプル
 * ブロックで 外部JSのURLを入力する。
 */
((Scratch) => {
    // 歯車画像URL
    const GEAR_IMAGE_SVG_URI = 'https://amami-harhid.github.io/turbowarpExtensions/assets/gear.svg';
    // テスト用JSファイルの場所 URL
    const TEST_URL = 'http://127.0.0.1:5500/turbowarpGithub/turbowarpExtensions/_03_extension';

    const MyExtensionInfo = {
        id : 'MYEXTENSION', 
        name : '独自拡張練習',
        color1 : '#000000', // 背景を黒に( 文字色は白固定なので背景を白にすると文字が読めない )
        color2 : '#ffffff', // ブロックリストの円周の色( 白 )
        color3 : '#0000ff', // ブロックの周囲の線の色（ 青 )
        blocks : [
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
                opcode : 'block01',
                blockType : Scratch.BlockType.COMMAND,
                text : '[GEAR_IMAGE] ブロック０１ [TEXT]',
                arguments: {
                    GEAR_IMAGE : {
                        type: Scratch.ArgumentType.IMAGE,
                        dataURI: GEAR_IMAGE_SVG_URI,
                    },
                    TEXT : {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'あいうえお',
                    }
                },
            },
        ],
    }
    class MyExtension {
        getInfo() {
            return MyExtensionInfo;
        }
        /**
         * ロードするJSファイルのURLを設定する
         * @param {*} args 
         * @param {*} util 
         */
        loadJSFileSetting( args, util ){
            this.jsUrl = args.JSURL;
        }
        /**
         * JSファイルをロードする
         * @param {*} args 
         * @param {*} util 
         */
        async setup( args, util ){
            console.log(this.jsUrl)
            try{
                const _t = new Date().getTime();
                const sub = await import(`${this.jsUrl}?_t=${_t}`);
                // 読み込むJSは export {TestJS} をしている前提。
                this.testJS = new sub.TestJS(); 
            }catch(e){
                console.error( '読み込みに失敗した、もしくはクラス定義が存在しないみたいです', e )
            }
        }
        block01( args, util ) {
            console.log( 'block01 TEXT=', args.TEXT );
            // sub.js 内のメソッドを実行する
            this.testJS.method01();
        }
    }

    Scratch.extensions.register(new MyExtension());

})(Scratch);


