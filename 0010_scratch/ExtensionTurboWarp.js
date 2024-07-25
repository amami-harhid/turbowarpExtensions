/**
 * TurboWarp 拡張機能( 基本構造 )
 */

((Scratch) => {
 
    class MotionMyExtensions {
        getInfo(){
            return {
                id: "MotionMyExtensions0010",   // 拡張機能のID(重複不可)
                name: "ExMotion0010",   // 表示文字列
                color1: "#ff5050",  // ブロックの色
                color2: "#ffffff",  // ブロック分類の〇の周囲の色
                blocks: [
                    {
                        opcode: "nothingToDo",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "何もしない",
                    },
                ],
            }
        }
        async nothingToDo( args, util ) {
            console.log('args', args);
            console.log('util', util);
            console.log('util.target',util.target);
        }
    }

    Scratch.extensions.register(new MotionMyExtensions());

})(Scratch);


