/**
 * Turbowarpの『カスタム拡張機能』を使おう【６】
 * P5JSを使い ボール（円）を描き、等速落下させる。
 * 
 */
((Scratch) => {
    /** 拡張機能ＩＤ */
    const ExtensionID = 'MyExtension063P5JS';
    /** 拡張機能表示名 */
    const ExtensionName = 'P5JS練習A';

    // 歯車画像URL
    const GEAR_IMAGE_SVG_URI 
        = 'https://amami-harhid.github.io/turbowarpExtensions/assets/gear.svg';

    // P5JS CDN URL
    const P5JSLIB 
        = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.js";

    // テスト用JSファイルの場所(HOST+DIRCTORY)
    const TEST_URL 
        = 'http://127.0.0.1:5500/_062_extension';
    
    const Sleep = (time) => new Promise((resolve) => setTimeout(resolve, time*1000));
    /**
     * 拡張機能定義
     */
    const ExtensionInfo = {
        id: ExtensionID,
        name: ExtensionName,
        blocks: [
            {
                opcode: "p5jsImport",
                blockType: Scratch.BlockType.COMMAND,
                text: "[IMG_GEAR]P5JS IMPORT",
                arguments: {
                    IMG_GEAR: {
                        type: Scratch.ArgumentType.IMAGE,       //タイプ
                        dataURI: GEAR_IMAGE_SVG_URI,            //歯車画像のURI
                    },
                },
            },
            {
                opcode: "subJsImport",
                blockType: Scratch.BlockType.COMMAND,
                text: "[IMG_GEAR]SUB IMPORT[SUBURL]",
                arguments: {
                    IMG_GEAR: {
                        type: Scratch.ArgumentType.IMAGE,       //タイプ
                        dataURI: GEAR_IMAGE_SVG_URI,            //歯車画像のURI
                    },
                    SUBURL: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: `${TEST_URL}/sub.js`,
                    },
                },
            },
            {
                opcode: 'p5JsSetup',
                blockType: Scratch.BlockType.COMMAND,
                text: "[IMG_GEAR]p5JsSetup",
                arguments: {
                    IMG_GEAR: {
                        type: Scratch.ArgumentType.IMAGE,       //タイプ
                        dataURI: GEAR_IMAGE_SVG_URI,            //歯車画像のURI
                    },
                },
            },
            {
                opcode: "p5JsDraw",
                blockType: Scratch.BlockType.COMMAND,
                text: "[IMG_GEAR]p5JsDraw",
                arguments: {
                    IMG_GEAR: {
                        type: Scratch.ArgumentType.IMAGE,       //タイプ
                        dataURI: GEAR_IMAGE_SVG_URI,            //歯車画像のURI
                    },
                },
            },
        ],
    }
    /**
     * P5JS拡張用クラス（練習）
     */
    class MyExtension {
        getInfo(){
            return ExtensionInfo;
        }
        /**
         * P5JSをインポートする
         * @param {*} args 
         * @param {*} util 
         */
        async p5jsImport( args, util ){
            try{
                // ここで P5JS CDN LIB を読み込む(キャッシュＯＫ)
                await import(P5JSLIB);

            }catch(e){
                const mesagge = 'P5JSの読み込みに失敗したみたいです'
                console.error( mesagge, e );
                alert(mesagge);
            }
        }
        /**
         * SUB JSをインポートする
         * @param {*} args 
         * @param {*} util 
         */
        async subJsImport( args, util ){
            this.jsUrl = args.SUBURL;
            try{
                // 外部テスト用JSファイルを読み込む(キャッシュからの読み込みをしない)
                const _t = new Date().getTime();
                const testJS = await import(`${this.jsUrl}?_t=${_t}`);
                const sketch = testJS.sketch(util.target.renderer.gl);
                this.p5 = new p5(sketch);
                await Sleep(0.5);

            }catch(e){
                const mesagge = 'SUB-JSの読み込みに失敗した、'
                    +'もしくはP5インスタンスモード開始に失敗したみたいです';
                console.error( mesagge, e );
                alert(mesagge);
            }
        }
        /**
         * Scratch3.x(=Turbowarp)のブロックから呼び出されるsetup処理
         * P5インスタンス化のタイミングで実行される setup()の処理(※1)とは
         * 別モノである。
         * @param {*} args 
         * @param {*} util 
         */
        async p5JsSetup( args, util ) {
            //await this.testJS.setup( this.p5, args, util);
        }
        /**
         * Scratch3.x(=Turbowarp)のブロックから呼び出されるdraw処理
         * @param {*} args 
         * @param {*} util 
         */
        async p5JsDraw( args, util ) {
            this.p5._draw();
        }
    }

    /** カスタム拡張機能クラスのインスタンスを登録する */
    Scratch.extensions.register(new MyExtension());

})(Scratch);