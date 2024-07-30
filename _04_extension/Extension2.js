/**
 * Turbowarpの『カスタム拡張機能』を使おう【４】
 * 外部JSファイルにて、Scratch標準ブロックを再現させる
 * １）指定されたSTEP数だけ動かす
 * ２）現在の位置を吹き出し表示する（言う、考える）
 */
(async function(Scratch) {
    // Extension ID
    const EXTENSION_ID = 'MYEXTENSION';
    const EXTENSION_NAME = '独自拡張練習';
    const variables = {};
    const blocks = [];
    const menus = {};

    // 歯車画像URL
    const GEAR_IMAGE_SVG_URI = 'https://amami-harhid.github.io/turbowarpExtensions/assets/gear.svg';
    // テスト用JSファイルの場所 URL
    const TEST_URL = 'http://127.0.0.1:5500/turbowarpGithub/turbowarpExtensions/_04_extension';

    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!")
        return
    }
    class Extension {
        getInfo() {
            return {
                "id": EXTENSION_ID,
                "name": EXTENSION_NAME,
                color1 : '#000000', // 背景を黒に( 文字色は白固定なので背景を白にすると文字が読めない )
                color2 : '#ffffff', // ブロックリストの円周の色( 白 )
                color3 : '#0000ff', // ブロックの周囲の線の色（ 青 )
                "blocks": blocks,
                "menus" : menus,
            }
        }
    }
    blocks.push({
        opcode: `loadJSFileSetting`,
        blockType: Scratch.BlockType.COMMAND,
        text: `[GEAR_IMAGE]JSファイルを指定する[JSURL]`,
        arguments: {
            GEAR_IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: GEAR_IMAGE_SVG_URI,
            },
            JSURL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `${TEST_URL}/sub.js`,
            },
        },
        disableMonitor: true
    });

    Extension.prototype[`loadJSFileSetting`] = async (args, util) => {
        variables['JSURL'] = args.JSURL;
    };

    blocks.push({
        opcode: `setup`,
        blockType: Scratch.BlockType.COMMAND,
        text: "[GEAR_IMAGE]事前準備",
        arguments: {
            GEAR_IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: GEAR_IMAGE_SVG_URI,
            },
        },
        disableMonitor: true
    });

    Extension.prototype[`setup`] = async (args, util) => {
        try{
            const jsUrl = variables['JSURL'];
            const _t = new Date().getTime();
            const sub = await import(`${jsUrl}?_t=${_t}`);
            // 読み込むJSは export {TestJS} をしている前提。
            const testJS = new sub.TestJS();
            variables['testJS'] = testJS;
        }catch(e){            
            const message = '外部JS、クラス定義が存在しないみたい';
            console.error( message, e );
            alert( message );
        }
    };

    blocks.push({
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
        disableMonitor: true
    });

    Extension.prototype[`moveStep`] = async (args, util) => {
        console.log( 'moveStep STEPS=', args.STEPS );
        // sub.js 内のメソッドを実行する
        const testJS = variables['testJS'];
        testJS.moveStep(args, util);
    };

    menus['FukidashiMenu'] = {
            items: [
                {'text':'話す','value':'say'},
                {'text':'考える','value':'think'},
            ]
        };

    blocks.push({
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
            }
        },
        disableMonitor: true
    });
    Extension.prototype[`sayPosition`] = async (args, util) => {
        console.log( 'sayPosition TYPE=', args.TYPE ); // say or think
        // sub.js 内のメソッドを実行する
        const testJS = variables['testJS'];
        testJS.sayPosition(args, util);
    };

    blocks.push({
        opcode : 'sayPositionForSec',
        blockType : Scratch.BlockType.COMMAND,
        text : '[GEAR_IMAGE] [SECS]秒間 位置を知らせる [TYPE]',
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
            }
        },
        disableMonitor: true
    });

    Extension.prototype[`sayPositionForSec`] = async (args, util) => {
        console.log( 'sayPosition TYPE=', args.TYPE ); // say or think
        console.log( 'sayPosition SECS=', args.SECS);   // second
        // sub.js 内のメソッドを実行する
        const testJS = variables['testJS'];
        await testJS.sayPositionForSec(args, util);
    };

    Scratch.extensions.register(new Extension());

})(Scratch);