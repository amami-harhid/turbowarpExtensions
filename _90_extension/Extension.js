/**
 * Turbowarpの『カスタム拡張機能』を使おう【９０】
 * ブロックに『リスト』を渡して、何が渡ってくるかを確認する
 */
((Scratch) => {
    /** 拡張機能ＩＤ */
    const ExtensionID = 'MyExtensionList';
    /** 拡張機能表示名 */
    const ExtensionName = 'リスト受渡し';

    /**
     * 拡張機能定義
     */
    const ExtensionInfo = {
        id: ExtensionID,
        name: ExtensionName,
        blocks: [
            {
                opcode: "getList",
                blockType: Scratch.BlockType.COMMAND,
                text: "リスト [LIST]",
                arguments: {
                    LIST: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: "",
                    },
                },
            },
        ],
    }
    class MyExtension {
        getInfo(){
            return ExtensionInfo;
        }
        getList( args, util ) {
            const _list = args.LIST;
            // --> リスト.join('') と同じ結果が表示される
            console.log('list', _list); 
        }
    }

    /** 独自Speechのインスタンスを登録する */
    Scratch.extensions.register(new MyExtension());

})(Scratch);