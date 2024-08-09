/**
 * Turbowarpの『カスタム拡張機能』を使おう【７】
 * TurbowarpでP5JSを動かす
 * SketchのURLを指定できるブロックを追加した
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
        = 'https://amami-harhid.github.io/turbowarpExtensions/07_01_extension';
    
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
                opcode: "p5jsSketchUrl",
                blockType: Scratch.BlockType.COMMAND,
                text: "[IMG_GEAR]P5JS Sketch⇒[SKETCH_URL]",
                arguments: {
                    IMG_GEAR: {
                        type: Scratch.ArgumentType.IMAGE,       //タイプ
                        dataURI: GEAR_IMAGE_SVG_URI,            //歯車画像のURI
                    },
                    SKETCH_URL: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: '',
                    }
                },
            },
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
        p5jsSketchUrl(args, util){
            const sketchUrl = args.SKETCH_URL;
            this.sketchUrl = sketchUrl;
            if(sketchUrl.length == 0) {
                this.sketchUrl = `${TEST_URL}/sketch.js`;
            }
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
                p5.prototype.registerMethod('beforeSetup', function(){
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
                        const _resizeCanvas = _reuseCanvas;
                        const _stageSizeObserver =()=>{
                            const canvas = util.target.renderer.gl.canvas;
                            // Stageサイズ変化時に resize処理をする
                            const observer = new MutationObserver(() => {
                                _resizeCanvas();
                            });
                            observer.observe(canvas, {
                                attriblutes: true,
                                attributeFilter: ["style"], 
                            });                    
                        };
                        // 【Sketchのsetupを置換】
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
            if(this.sketchUrl == undefined) {
                this.sketchUrl = `${TEST_URL}/sketch.js`;
            }
            try{
                // Sketchを読み込む(キャッシュからの読み込みをしない)
                const _t = new Date().getTime();
                const sketchUrl = `${this.sketchUrl}?_t=${_t}`;
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