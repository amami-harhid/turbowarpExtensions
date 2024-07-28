const MathUtil = class{
    static degToRad (deg) {
        return deg * Math.PI / 180;
    }
}

const TestJS = class{
    moveStep(args, util){

        // 向きの方向へ STEPSの長さ分 位置を変える（移動させる）
        const steps = Scratch.Cast.toNumber(args.STEPS);
        const radians = MathUtil.degToRad(90 - util.target.direction);
        const dx = steps * Math.cos(radians);
        const dy = steps * Math.sin(radians);
        util.target.setXY(util.target.x + dx, util.target.y + dy);

    }
    sayPosition(args, util){
        
        const type = args.TYPE;
        const position = {x:util.target.x, y:util.target.y};
        const message = `x=(${position.x}), y=(${position.y})`;
        util.runtime.emit('SAY', util.target, type, message);
    }
}

export {TestJS};