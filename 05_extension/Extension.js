/**
 * Turbowarpの『カスタム拡張機能』を使おう【５】
 * 外部JSファイルにて、スピーチさせる 
 */
((Scratch) => {
    /** 拡張機能ＩＤ */
    const ExtensionID = 'MyExtensionSpeech';
    /** 拡張機能表示名 */
    const ExtensionName = '独自スピーチ実装';

    // 歯車画像URL
    const GEAR_IMAGE_SVG_URI 
        = 'https://amami-harhid.github.io/turbowarpExtensions/assets/gear.svg';
    // テスト用JSファイルの場所(HOST+DIRCTORY)
    const TEST_URL 
        = 'http://127.0.0.1:5500/_05_extension';
    

    /**
     * 言語表示名
    */
    const LOCALE_TEXT = {
        ENGLISH : 'English',
        JAPANESE: "日本語",
        DEUTSCH: "Deutsch",
    }
    /**
     * 言語ＩＤ
     */
    const LOCALE_VALUE = {
        ENGLISH : 'en-US',
        JAPANESE : 'ja-JP',
        DEUTSCH: "de-DE",
    }
    /**
     * 性別表示名
     */
    const GENDER_TEXT = {
        MALE: '男声',
        FEMALE: '女声',
    };
    /**
     * 性別ＩＤ
     */
    const GENDER_VALUE = {
        MALE: 'male',
        FEMALE: 'female',
    }
    /**
     * 拡張機能定義
     */
    const ExtensionInfo = {
        id: ExtensionID,
        name: ExtensionName,
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
                opcode: "speech",
                blockType: Scratch.BlockType.COMMAND,
                text: "[IMG_GEAR]話す [text],[locale],[gender]",
                arguments: {
                    IMG_GEAR: {
                        type: Scratch.ArgumentType.IMAGE,       //タイプ
                        dataURI: GEAR_IMAGE_SVG_URI,            //歯車画像のURI
                    },
                    text: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: "こんにちは",
                    },
                    locale: {
                        type: Scratch.ArgumentType.NUMBER,
                        menu: 'LocaleMenu',
                        defaultValue: LOCALE_VALUE.JAPANESE,
                    },
                    gender: {
                        type: Scratch.ArgumentType.NUMBER,
                        menu: 'GenderMenu',
                        defaultValue: GENDER_VALUE.MALE,
                    }
                },
            },
            {
                opcode: "speechAndWait",
                blockType: Scratch.BlockType.COMMAND,
                text: "[IMG_GEAR]話し終わるまで待つ[text],[locale],[gender]",
                arguments: {
                    IMG_GEAR: {
                        type: Scratch.ArgumentType.IMAGE,       //タイプ
                        dataURI: GEAR_IMAGE_SVG_URI,            //歯車画像のURI
                    },
                    text: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: "こんにちは",
                    },
                    locale: {
                        type: Scratch.ArgumentType.NUMBER,
                        menu: 'LocaleMenu',
                        defaultValue: LOCALE_VALUE.JAPANESE,
                    },
                    gender: {
                        type: Scratch.ArgumentType.NUMBER,
                        menu: 'GenderMenu',
                        defaultValue: GENDER_VALUE.MALE,
                    }
                },
            },
        ],
        // メニューの定義
        menus: {
            LocaleMenu: {
                items: [
                    {text : LOCALE_TEXT.JAPANESE, value : LOCALE_VALUE.JAPANESE},
                    {text : LOCALE_TEXT.ENGLISH, value : LOCALE_VALUE.ENGLISH},
                    {text : LOCALE_TEXT.DEUTSCH, value : LOCALE_VALUE.DEUTSCH},
                ],
            },
            GenderMenu: {
                items: [
                    {text : GENDER_TEXT.MALE, value : GENDER_VALUE.MALE},
                    {text : GENDER_TEXT.FEMALE, value : GENDER_VALUE.FEMALE},
                ],
            }

        }

    }
    /**
     * 独自スピーチ用のクラス
     */
    class MyExtension {
        getInfo(){
            return ExtensionInfo;
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
            try{
                const _t = new Date().getTime();
                const sub = await import(`${this.jsUrl}?_t=${_t}`);
                // 読み込むJSは export {TestJS} をしている前提。
                this.testJS = new sub.TestJS(); 
            }catch(e){
                const mesagge = '読み込みに失敗した、もしくはクラス定義が存在しないみたいです'
                console.error( mesagge, e );
                alert(mesagge);
            }
        }
        /**
         * 話す
         * @param {*} args 
         * @param {*} util 
         */
        speech(args, util ) {
            this.testJS.speech(args, util);
        }
        /**
         * 話し終わるまで待つ
         * @param {*} args 
         * @param {*} util 
         */
        async speechAndWait(args, util ) {
            await this.testJS.speechAndWait(args, util);
        }
    }

    /** 独自Speechのインスタンスを登録する */
    Scratch.extensions.register(new MyExtension());

})(Scratch);