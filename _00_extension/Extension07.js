/**
 * Turbowarpの『カスタム拡張機能』を使おう【１】
 * 基本構造 blockの中に画像を表示する
 */
((Scratch) => {
    const GEAR_IMAGE_SVG_URI = 'https://amami-harhid.github.io/turbowarpExtensions/assets/gear.svg';
    const MyExtensionInfo = {
        id : 'MYEXTENSION', 
        name : '独自拡張練習',
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

    class MyExtension {
        getInfo() {
            return MyExtensionInfo;
        }
        block01( args, util ) {
            console.log('block01が動作したよ');
        }
        block02( args, util ) {
            console.log( 'block02 TEXT=', args.TEXT );
        }
    }

    Scratch.extensions.register(new MyExtension());

})(Scratch);


