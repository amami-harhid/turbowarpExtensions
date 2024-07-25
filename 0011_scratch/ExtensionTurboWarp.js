/**
 * TurboWarp 拡張機能( 基本構造 )
 */

((Scratch) => {
 
    const SAMPLE_SVG = `data:image/svg+xml,
    <svg width="24px" height="24px" viewBox="0 0 24 24" 
    fill="none" xmlns="http://www.w3.org/2000/svg" 
    aria-labelledby="extensionIconTitle" stroke="%232329D6" 
    stroke-width="1" stroke-linecap="round" 
    stroke-linejoin="round" color="%232329D6">
    <title id="extensionIconTitle">Extension</title>
    <path d="M9 4C9 2.89543 9.89543 2 11 2C12.1046 2 13 2.89543 
    13 4V6H18V11H20C21.1046 11 22 11.8954 22 13C22 14.1046 21.1046 
    15 20 15H18V20H13V18C13 16.8954 12.1046 16 11 16C9.89543 16 9 
    16.8954 9 18V20H4V15H6C7.10457 15 8 14.1046 8 13C8 11.8954 
    7.10457 11 6 11H4V6H9V4Z"/></svg>`;

    class MotionMyExtensions {
        getInfo(){
            return {
                id: "MotionMyExtensions0011",   // 拡張機能のID(重複不可)
                name: "ExMotion0011",   // 表示文字列
                color1: "#505550",  // ブロックの色
                color2: "#ffffff",  // ブロック分類の〇の周囲の色
                blocks: [
                    {
                        opcode: "nothingToDo",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "[IMG_SAMPLE]何もしない",
                        arguments: {
                            IMG_SAMPLE: {
                                type: Scratch.ArgumentType.IMAGE,       //画像タイプ
                                dataURI: SAMPLE_SVG,        //画像のURI
                            },
                        },
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


