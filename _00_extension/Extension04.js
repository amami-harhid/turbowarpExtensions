/**
 * Turbowarpの『カスタム拡張機能』を使おう【１】
 * 基本構造 blockを１個だけ定義、対応するメソッドを定義
 */
((Scratch) => {
    const MyExtensionInfo = {
        id : "MYEXTENSION", 
        name : "独自拡張練習",
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
            
        }
    }

    Scratch.extensions.register(new MyExtension());

})(Scratch);