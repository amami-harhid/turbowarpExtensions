/**
 * TurboWarp 拡張機能( 基本構造 )
 */

((Scratch) => {
 
    class MotionMyExtensions {
        getInfo(){
            return {
                id: "MotionMyExtensions0011",   // 拡張機能のID(重複不可)
                name: "ExMotion0013",   // 表示文字列
                color1: "#002000",  // ブロックの色
                color2: "#ffffff",  // ブロック分類の〇の周囲の色
                blocks: [
                    {
                        opcode: "fukidashi",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "ふきだしを出してみる[MESSAGE][TYPES]",
                        arguments: {
                            MESSAGE: {
                                type: Scratch.ArgumentType.NUMBER,       //タイプ
                                defaultValue: "はじめまして",
                            },
                            TYPES: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'FukidashiMenu',  // menusのキー
                            }
                        },
                    },
                ],
                // メニューの定義
                menus: {
                    FukidashiMenu: {
                        items: ['say','think'],
                    }
                }
            }
        }
        fukidashi( args, util ) {
            console.log('args', args);
            console.log('util', util);
            util.runtime.emit('SAY', util.target, args.TYPES, args.MESSAGE);
        }
    }

    Scratch.extensions.register(new MotionMyExtensions());

})(Scratch);


