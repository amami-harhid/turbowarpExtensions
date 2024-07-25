/**
 * TurboWarp 拡張機能( 動きブロックの再現みたいなもの )
 */
const BLOCK_MEDIA_ROTATE_RIGHT_IMG = "/static/blocks-media/default/rotate-right.svg";

((Scratch) => {
    class MathUtil {

        static degToRad (deg) {
            return deg * Math.PI / 180;
        }
    }
    class MotionMyExtensions {
        getInfo(){
            return {
                id: "MotionMyExtensions",   // 拡張機能のID(重複不可)
                name: "ExMotion",   // 表示文字列
                color1: "#ff5050",  // ブロックの色
                color2: "#ffffff",  // ブロック分類の〇の周囲の色
                blocks: [
                    {
                        opcode: "rotateAndMove",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "[IMG_ROTATE_RIGHT][DEGREES]度回して[STEPS]歩動かす",
                        arguments: {
                            IMG_ROTATE_RIGHT: {
                                type: Scratch.ArgumentType.IMAGE,       //画像タイプ
                                dataURI: BLOCK_MEDIA_ROTATE_RIGHT_IMG,  //右回転の画像のURI( "⤾" )
                            },
                            DEGREES: {
                                // 角度を指定する
                                type: Scratch.ArgumentType.ANGLE,
                                defaultValue: 0,
                            },
                            STEPS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 10,
                            },
                        },
                    },
                ],
            }
        }
        async rotateAndMove( args, util ) {
            // 角度を数値に変換し、現在の向きに加算する（右へ回転）
            const degrees = Scratch.Cast.toNumber(args.DEGREES);
            util.target.setDirection(util.target.direction + degrees);// 右へ回転
            // 向きの方向へ STEPSの長さ分 移動させる
            const steps = Scratch.Cast.toNumber(args.STEPS);
            const radians = MathUtil.degToRad(90 - util.target.direction);
            const dx = steps * Math.cos(radians);
            const dy = steps * Math.sin(radians);
            util.target.setXY(util.target.x + dx, util.target.y + dy);
        }
    }

    Scratch.extensions.register(new MotionMyExtensions());

})(Scratch);


