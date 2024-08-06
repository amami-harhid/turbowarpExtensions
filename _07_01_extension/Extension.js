/**
 * Turbowarpの『カスタム拡張機能』を使おう【６】
 * TurbowarpでP5JSを動かす
 * Stageをキャンバスにするために StageのCanvasを
 * 使って createCanvasを実行する
 * 
 */
((Scratch) => {
    /** 拡張機能ＩＤ */
    const ExtensionID = 'MyExtension0701P5JS';
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
        = 'http://127.0.0.1:5500/_07_01_extension';
    
    // この拡張機能内(Module内)だけで使う前提のグローバル変数
    window._ExtentionGlobals = {};
    window._ExtentionGlobals.TEST_URL = TEST_URL;

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
                opcode: 'p5JsStart',
                blockType: Scratch.BlockType.COMMAND,
                text: "[IMG_GEAR]p5Jsを開始する",
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
                text: "[IMG_GEAR]P5JS描画をする",
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
                // 【P5JS フックの登録】(beforeSetup)
                // p5.setup実行直前に呼び出すフックを登録する処理。
                // StageのCanvasをSketchの中で直接には参照できないので
                // utilが参照できる箇所で定義した。
                p5.prototype.registerMethod('beforeSetup', function(){
                    // このフックは１回だけ実行されることになっている
                    // フック実行時、thisは p5インスタンスである
                    const p = this; 
                    // Sketchにsetupが登録されているときSketchのsetupを上書きする                    
                    if(p.setup){
                        // 【StageのCanvasをP5jsのCanvasとして利用】
                        const _reuseCanvas = () => {
                            // StageのCanvasを取得する
                            const canvas = util.target.renderer.gl.canvas;
                            const w = canvas.clientWidth;
                            const h = canvas.clientHeight;
                            // StageのCanvasをp5jsのCanvasとして使う
                            p.createCanvas(w, h, p.WEBGL, canvas);
                        }
                        // 【Stageサイズ変化監視】
                        // Stageサイズの変化をMutationObserverにて監視し
                        // サイズ変更時はサイズ変更後のCanvasで再度使用宣言をする
                        const _resizeCanvas = _reuseCanvas;
                        const _stageSizeObserver =()=>{
                            const canvas = util.target.renderer.gl.canvas;
                            // Stageサイズ変化時に resize処理をする
                            const observer = new MutationObserver(() => {
                                _resizeCanvas();
                            });
                            // Scratch3.xのキャンバスサイズ変更は、style属性の値が
                            //　変化しているため、style属性の変化を監視する。
                            observer.observe(canvas, {
                                attriblutes: true,
                                attributeFilter: ["style"], 
                            });                    
                        };
                        // 【Sketchのsetupを置換】
                        // createCanvasは フックの中で直接に実行してはいけない
                        // setup の中で createCanvasを実行するように
                        // sketchのsetupを置き換える
                        const _sketchSetup = p.setup;
                        const _wraper = () => {
                            // drawの繰返しを抑止する
                            p.noLoop(); 
                            // StageのCanvasをP5jsのCanvasとして利用する
                            _reuseCanvas(); 
                            // Stageサイズ変化を監視する
                            _stageSizeObserver(); 
                            // 元のsetupを実行する
                            _sketchSetup();                            
                        }
                        p.setup = _wraper;
                    }

                });
            }catch(e){
                const mesagge = 'P5JSの読み込みに失敗したみたいです'
                console.error( mesagge, e );
                alert(mesagge);
            }
        }
        /**
         * p5JS setup を開始する
         * @param {*} args 
         * @param {*} util 
         */
        async p5JsStart( args, util ){
            this.jsUrl = args.SUBURL;
            try{
                // Sketchを読み込む(キャッシュからの読み込みをしない)
                const _t = new Date().getTime();
                const sketchUrl = `${TEST_URL}/sketch.js?_t=${_t}`;
                const {sketch} = await import( sketchUrl );
                const p = new p5(sketch);
                this.p = p;

            }catch(e){
                const mesagge = 'Sketchの読み込みに失敗した、'
                    +'もしくはP5JSインスタンスモード開始に失敗した';
                console.error( mesagge, e );
                alert(mesagge);
            }
        }
        /**
         * Scratch3.x(=Turbowarp)のブロックから呼び出されるdraw処理
         * @param {*} args 
         * @param {*} util 
         */
        async p5JsDraw( args, util ) {
            this.p._draw();
        }
    }

    /** カスタム拡張機能クラスのインスタンスを登録する */
    Scratch.extensions.register(new MyExtension());

})(Scratch);