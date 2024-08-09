const TestJS = class {
    
    async method01(args,util) {
        const soundName = args.SOUND;
        for(const sound of util.target.sprite.sounds){
            if(sound && sound.name === soundName){
                await this._playSound(sound);
                return;
            }
        }
    }
    async _playSound(sound){
        const audioEngine = Scratch.vm.runtime.audioEngine;
        const soundBank = util.target.sprite.soundBank;
        const sound = foundSound;
        const soundPlayer = (await audioEngine.decodeSoundPlayer({
            data: {
                buffer: sound.asset.data.buffer,
            }
        })).take();
        soundBank.addSoundPlayer(soundPlayer);
        await soundBank.playSound(util.target, soundPlayer.id);
        delete soundBank.soundPlayers[soundPlayer.id];
        soundBank.playerTargets.delete(soundPlayer.id);
        soundBank.soundEffects.delete(soundPlayer.id);
    }

}

export {TestJS};