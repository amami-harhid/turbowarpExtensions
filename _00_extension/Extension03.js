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


