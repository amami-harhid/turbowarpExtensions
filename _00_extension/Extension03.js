/**
 * Turbowarpの『カスタム拡張機能』を使おう【１】
 * 基本構造 blockの配列
 */
((Scratch) => {
    const MyExtensionInfo = {
        id : "MYEXTENSION", 
        name : "独自拡張練習",
        blocks : [ ],
    }

    class MyExtension {
        getInfo() {
            return MyExtensionInfo;
        }
    }

    Scratch.extensions.register(new MyExtension());

})(Scratch);


