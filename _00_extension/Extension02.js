((Scratch) => {
    const MyExtensionInfo = {
        // 拡張機能のID,他拡張機能と被るIDはNG である
        // なおサンプルの値が大文字なのはあまり意味はない。
        // これなら他拡張機能IDと被らないだろうと思う文字列を書くことだけがルール。
        id : "MYEXTENSION", 
        // 拡張機能のブロックリストに表記される名前。これが他機能と被っても拡張機能の動作には
        // 影響はしないので気軽に命名してよい。
        // 使ってくれるかもしれないお友達が「わかりにくい」といって怒るかもしれないので注意せよ。
        name : "独自拡張練習",
    }

    class MyExtension {
        getInfo() {
            return MyExtensionInfo;
        }
    }

    Scratch.extensions.register(new MyExtension());

})(Scratch);


