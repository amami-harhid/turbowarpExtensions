/**
 * Turbowarpの『カスタム拡張機能』を使おう【２】
 * 外部JSに書いた処理を実行するサンプル
 * 固定のHOST/DIRECTORY/FILE を使ってJSファイルを読み込む。
 */
((Scratch) => {
    // 拡張機能ＩＤ
    const ExtensionID = 'MYEXTENSION';
    // 拡張機能表示名
    const ExtensionName = '独自拡張練習';
    // 歯車画像URL
    const GEAR_IMAGE_SVG_URI 
        = 'https://amami-harhid.github.io/turbowarpExtensions/assets/gear.svg';
    
    const MyExtensionInfo = {
        id : ExtensionID, 
        name : ExtensionName,
        color1 : '#000000', // 背景を黒に( 文字色は白固定なので背景を白にすると文字が読めない )
        color2 : '#ffffff', // ブロックリストの円周の色( 白 )
        color3 : '#0000ff', // ブロックの周囲の線の色（ 青 )
        blocks : [
            {
                opcode : 'block01',
                blockType : Scratch.BlockType.COMMAND,
                text : '[GEAR_IMAGE] ブロック０１',
                arguments: {
                    GEAR_IMAGE : {
                        type: Scratch.ArgumentType.IMAGE,
                        dataURI: GEAR_IMAGE_SVG_URI,
                    },
                },
            },
            {
                opcode : 'block02',
                blockType : Scratch.BlockType.COMMAND,
                text : '[GEAR_IMAGE] ブロック０２ [TEXT]',
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
    const HOST = 'http://127.0.0.1:5500';
    const DIRECTORY = 'turbowarpExtensions/_02B_extension';
    const FILE = 'sub.js';
    class MyExtension {
        getInfo() {
            return MyExtensionInfo;
        }
        async block01( args, util ) {
            console.log('block01が動作したよ');
            const QUERY = new Date().getTime(); // キャッシュ回避のためいつも違う文字列にする
            const SUB = await import(`${HOST}/${DIRECTORY}/${FILE}?_t=${QUERY}`);
            this.testJS = new SUB.TestJS();
        }
        block02( args, util ) {
            console.log( 'block02 TEXT=', args.TEXT );
            // sub.js 内のメソッドを実行する
            this.testJS.method01();
        }
    }

    Scratch.extensions.register(new MyExtension());

})(Scratch);


