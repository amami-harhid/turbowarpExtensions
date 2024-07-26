class MathUtil {

    static degToRad (deg) {
        return deg * Math.PI / 180;
    }
}

const TestJs = class {

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

export {TestJs};