((Scratch) => {
    const MyExtensionInfo = {
        id : 'MYEXTENSION', 
        name : '独自拡張練習',
        blocks : [
            {
                opcode : 'block01',
                blockType : Scratch.BlockType.COMMAND,
                text : 'ブロック０１',
            },
            {
                opcode : 'block02',
                blockType : Scratch.BlockType.COMMAND,
                text : 'ブロック０２ [TEXT]',
                arguments: {
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


