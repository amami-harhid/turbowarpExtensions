/**
 * Turbowarpの『カスタム拡張機能』を使おう【４】
 * 外部JSファイルにて、Scratch標準ブロックを再現させる
 * １）指定されたSTEP数だけ動かす
 * ２）現在の位置を吹き出し表示する（言う、考える）
 */
((Scratch) => {
    // 歯車画像URL
    const GEAR_IMAGE_SVG_URI = 'https://amami-harhid.github.io/turbowarpExtensions/assets/gear.svg';
    // テスト用JSファイルの場所 URL
    const TEST_URL = 'http://127.0.0.1:5500/turbowarpGithub/turbowarpExtensions/_04_extension';

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
                opcode : 'moveStep',
                blockType : Scratch.BlockType.COMMAND,
                text : '[GEAR_IMAGE] 動かす [STEPS]',
                arguments: {
                    GEAR_IMAGE : {
                        type: Scratch.ArgumentType.IMAGE,
                        dataURI: GEAR_IMAGE_SVG_URI,
                    },
                    STEPS : {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 10,
                    }
                },
            },
            {
                opcode : 'sayPosition',
                blockType : Scratch.BlockType.COMMAND,
                text : '[GEAR_IMAGE] 位置を知らせる [TYPE]',
                arguments: {
                    GEAR_IMAGE : {
                        type: Scratch.ArgumentType.IMAGE,
                        dataURI: GEAR_IMAGE_SVG_URI,
                    },
                    TYPE : {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'FukidashiMenu',  // menusのキー
                        defaultValue: 'say',
                    },
                },
            },
            {
                opcode : 'sayPositionForSec',
                blockType : Scratch.BlockType.COMMAND,
                text : '[GEAR_IMAGE] [SECS]秒、位置を知らせる [TYPE]',
                arguments: {
                    GEAR_IMAGE : {
                        type: Scratch.ArgumentType.IMAGE,
                        dataURI: GEAR_IMAGE_SVG_URI,
                    },
                    SECS : {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 2,
                    },
                    TYPE : {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'FukidashiMenu',  // menusのキー
                        defaultValue: 'say',
                    },
                },
            },
        ],
        // メニューの定義
        menus: {
            FukidashiMenu: {
                items: [
                    {'text':'話す','value':'say'},
                    {'text':'考える','value':'think'},
                ],
            }
        }
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
        moveStep( args, util ) {
            console.log( 'moveStep STEPS=', args.STEPS );
            // sub.js 内のメソッドを実行する
            this.testJS.moveStep(args, util);
        }
        sayPosition( args, util ) {
            console.log( 'sayPosition TYPE=', args.TYPE ); // say or think
            // sub.js 内のメソッドを実行する
            this.testJS.sayPosition(args, util);
        }
        async sayPositionForSec( args, util ) {
            console.log( 'sayPosition TYPE=', args.TYPE ); // say or think
            console.log( 'sayPosition SECS=', args.SECS);   // second
            // sub.js 内のメソッドを実行する
            await this.testJS.sayPositionForSec(args, util);
        }
    }

    Scratch.extensions.register(new MyExtension());

})(Scratch);


