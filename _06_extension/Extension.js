/**
 * Turbowarpの『カスタム拡張機能』を使おう【６】
 * P5.JSを使ってキャンバス上に『線』を引く練習
 * 
 * Scratch3.x(=Turbowarp)の座標(x,y)について
 * (1) 中央 = ( 0, 0 )
 * (2) x が大きいとき下(↓)、xが小さいとき上(↑)になる
 * (3) y が大きいとき右(→)、xが小さいとき左(←)になる
 */
((Scratch) => {
    /** 拡張機能ＩＤ */
    const ExtensionID = 'MyExtension06P5JS';
    /** 拡張機能表示名 */
    const ExtensionName = 'P5JS練習';

    // 歯車画像URL
    const GEAR_IMAGE_SVG_URI 
        = 'https://amami-harhid.github.io/turbowarpExtensions/assets/gear.svg';

    // P5JS CDN URL
    const P5JSLIB 
        = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.js";

    // テスト用JSファイルの場所(HOST+DIRCTORY)
    const TEST_URL 
        = 'http://127.0.0.1:5500/_06_extension';
    
    /**
     * 拡張機能定義
     */
    const ExtensionInfo = {
        id: ExtensionID,
        name: ExtensionName,
        color1 : '#005555', // ブロック色
        color2 : '#0000ff', // ブロックリストの円周の色( 青 )
        color3 : '#0000ff', // ブロックの周囲の線の色（ 青 )
        blocks: [
            {
                opcode: "jsInitialize",
                blockType: Scratch.BlockType.COMMAND,
                text: "[IMG_GEAR]JS指定処理[SUBURL]",
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
         * JSファイルをロードする
         * @param {*} args 
         * @param {*} util 
         */
        async jsInitialize( args, util ){
            this.jsUrl = args.SUBURL;
            try{
                // ここで P5JS CDN LIB を読み込む(キャッシュＯＫ)
                await import(P5JSLIB);

                // 外部テスト用JSファイルを読み込む(キャッシュからの読み込みをしない)
                const _t = new Date().getTime();
                const sub = await import(`${this.jsUrl}?_t=${_t}`);
                // テスト用クラスのインスタンス化
                // 読み込むJSは export {TestJS} をしている前提。
                this.testJS = new sub.TestJS();

                // P5JS インスタンスモード
                const _this = this;
                const s = (p5) => {
                    p5.setup = () => { // ※1
                        _this.p5 = p5; // ※2: p5 オブジェクトを退避する
                        // p5jsインスタンス化時に自動的に 本来のsetupを実行させたく
                        // ないので最低限の処理しか書いていない。
                        // ※2の p5オブジェクトを退避したいためだけに用意している
                   };
                    p5.draw = () => { // ※3
                        // drawに関連するp5のシステム変数(frameCountなど)を
                        // 有効としたいためだけに空のdrawメソッドを用意する
                    };
                }
                // P5インスタンス化、インスタンス値そのものは使われることはない。
                // P5インスタンス化と同時に (※1)p5.setup()の処理が動きだし、
                // (※3)p5.draw()の処理がFPS間隔で呼び出される。
                new p5(s); 

            }catch(e){
                const mesagge = '読み込みに失敗した、もしくはクラス定義が存在しないみたいです'
                console.error( mesagge, e );
                alert(mesagge);
            }
        }
        /**
         * Scratch3.x(=Turbowarp)のブロックから呼び出されるsetup処理
         * P5インスタンス化のタイミングで実行される (※1)setup()の処理とは
         * 別モノである。
         * @param {*} args 
         * @param {*} util 
         */
        async p5JsSetup( args, util ) {
            console.log('p5JsSetup start', this.p5);
            await this.testJS.setup( this.p5, args, util);
        }
        /**
         * Scratch3.x(=Turbowarp)のブロックから呼び出されるdraw処理
         * FPS間隔で実行される (※2)P5.draw()の処理とは別モノである
         * @param {*} args 
         * @param {*} util 
         */
        async p5JsDraw( args, util) {
            await this.testJS.draw( this.p5, args,util);
        }
    }

    /** カスタム拡張機能クラスのインスタンスを登録する */
    Scratch.extensions.register(new MyExtension());

})(Scratch);