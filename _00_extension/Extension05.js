((Scratch) => {
    const MyExtensionInfo = {
        id : 'MYEXTENSION', 
        name : '独自拡張練習',
        blocks : [
            {
                // 拡張機能内のブロックのなかで、ユニークにするべき
                opcode : 'block01',
                blockType : Scratch.BlockType.COMMAND,
                text : 'ブロック０１',
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
    }

    Scratch.extensions.register(new MyExtension());

})(Scratch);


